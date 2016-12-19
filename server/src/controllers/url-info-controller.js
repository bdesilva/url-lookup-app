/* UrlInfoController class to handle url functionality */

import BaseController from './base-controller';
import GenericHelper from '../helpers/generic-helper';
import RepositoryFactory from '../models/repository-factory';

export class UrlInfoController extends BaseController {
    constructor(enforcer, config) {
        super();
        if (enforcer != this.singletonEnforcer) throw "Cannot construct UrlInfoController";
        this.dataStore = RepositoryFactory.create(config.urlControllerOptions.persistence);
    }

    async fetchUrl(hostname_and_port) {
        let urlMatch;

        try {
            urlMatch = await this.dataStore.getUrl(hostname_and_port);
        } catch (err) {
            console.log(`Get error: ${err}`);
        }
        return JSON.parse(urlMatch);
    }

    setUrl(response, entryAdded, params, data) {
        let resultData;

        if (entryAdded.updated) {
            this.dataStore.storeUrl(params.hostname_and_port, data);
            resultData = this.buildOutputData(params, response.status = 200, { successMessage: 'Record updated.' });
        } else if (entryAdded.new) {
            this.dataStore.storeUrl(params.hostname_and_port, data);
            resultData = this.buildOutputData(params, response.status = 201, { successMessage: 'Record added.' });
        } else {
            resultData = this.buildOutputData(params, response.status = 422, { errorMessage: 'Trying to insert a duplicate record.' });
        }
        return resultData;
    }

    async getUrlData(params, response) {
        const malUrlData = await this.fetchUrl(params.hostname_and_port);

        //Check to see if there is a match on the hostname and port
        if (malUrlData) {
            if (params.original_path_and_query_string) {
                const pathQuery = GenericHelper.splitPathQuery(params.original_path_and_query_string);

                //Scan full path to initially determine a match.
                if (malUrlData.fullPath[pathQuery.fullPath]) {
                    malUrlData.fullPath[pathQuery.fullPath].hits++;
                    return this.buildOutputData(params, response = 200, { isMalicious: true });
                }

                //Analyze user path in depth by running a first pass to find an exact path                
                if (malUrlData.paths.find(val => val === pathQuery.path))
                    return this.buildOutputData(params, response = 200, { isMalicious: true });

                //Next, if no match is found, start splitting the path in order to find a possible match on a substring
                //starting with the first path substring
                let urlPath = '';
                let urlPathQuery = '';
                for (let point of pathQuery.path.split('/')) {
                    if (point !== '') {
                        urlPath += `/${point}`;
                        if (malUrlData.paths.find(val => val === urlPath))
                            return this.buildOutputData(params, response = 200, { isMalicious: true });
                    }
                }
            }
            return this.buildOutputData(params, response = 200, { isMalicious: false });
        } else {
            return this.buildOutputData(params, response = 200, { isMalicious: false });
        }
    }

    async postUrlData(params, response) {
        const pathQuery = GenericHelper.splitPathQuery(params.original_path_and_query_string);
        const malUrlData = await this.fetchUrl(params.hostname_and_port);
        let newEntryInfo;

        //Check to see if the hostname and port exist, and if so append path and query data appropriately
        if (malUrlData) {
            let entryAdded = false;

            if (!malUrlData.paths.find(val => val === pathQuery.path)) {
                malUrlData.paths.push(pathQuery.path);
                entryAdded = true;
            }

            if (!malUrlData.query.find(val => val === pathQuery.query)) {
                malUrlData.query.push(pathQuery.query);
                entryAdded = true;
            }

            if (!malUrlData.fullPath[pathQuery.fullPath]) {
                malUrlData.fullPath[pathQuery.fullPath] = { hits: 0 };
                entryAdded = true;
            }

            //Update record in the data store.
            return this.setUrl(response, { updated: entryAdded }, params, malUrlData);
        } else {
            //If hostname and port do not exist, add the record to the data store.
            const objToAdd = {
                paths: new Array(pathQuery.path),
                query: new Array(pathQuery.query),
                fullPath: {}
            };
            objToAdd.fullPath[params.original_path_and_query_string] = { hits: 0 };
            newEntryInfo = this.setUrl(response, { new: true }, params, objToAdd);
        }
        return newEntryInfo;
    }
}
