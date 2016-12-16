/* UrlInfoController class to handle url functionality */

import BaseController from './base-controller';
import GenericHelper from '../helpers/generic-helper';

export class UrlInfoController extends BaseController {
    constructor(enforcer) {
        super();
        if (enforcer != this.singletonEnforcer) throw "Cannot construct UrlInfoController";
        this.urlList = {
            'www.google.com': {
                paths: ['/'],
                query: [''],
                fullPath: {'/': {hits: 0}}
            },
            'example.com': {
                paths: ['/badurl', '/badurl/haha, /badurl/hi'],
                query: ['?activate=true', '?activate=false&signal=1'],
                fullPath: {'/badurl?activate=true': {hits: 0}, '/badurl/haha': {hits: 0},
                 '/badurl/hi?activate=false&signal=1': {hits: 0}}
            },
            'example.com:8400': {
                paths: ['/hi', '/hey'],
                query: ['?some-flag=1'],
                fullPath: {'/hi?some-flag=1': {hits: 0}, '/hey': {hits: 0}}
            }
        };
    }

    getUrlData(params, response) {
        //Check to see if there is a match on the hostname and port
        if (this.urlList[params.hostname_and_port]) {
            const malUrlData = this.urlList[params.hostname_and_port];
            if (params.original_path_and_query_string) {
                const pathQuery = GenericHelper.splitPathQuery(params.original_path_and_query_string);
                console.log(pathQuery);

                //Scan full path to initially determine a match.
                if (malUrlData.fullPath[pathQuery.fullPath]) {
                    malUrlData.fullPath[pathQuery.fullPath].hits++;
                    return this.buildOutputData(params, response = 200, {isMalicious: true});
                }

                //Analyze user path in depth by running a first pass to find an exact path                
                if (malUrlData.paths.find(val => val === pathQuery.path))
                    return this.buildOutputData(params, response = 200, {isMalicious: true});

                //Next, if no match is found, start splitting the path in order to find a possible match on a substring
                //starting with the first path substring
                let urlPath = '';
                let urlPathQuery = '';
                for (let point of pathQuery.path.split('/')) {
                    if (point !== '') {
                        urlPath += `/${point}`;
                        console.log(urlPath);
                        console.log(urlPath === malUrlData.paths.find(val => val === urlPath));
                        if (malUrlData.paths.find(val => val === urlPath))
                            return this.buildOutputData(params, response = 200, {isMalicious: true});
                    }
                }
            }
            return this.buildOutputData(params, response = 200, {isMalicious: false});
        } else {
            return this.buildOutputData(params, response = 200, {isMalicious: false});
        }
    }

    postUrlData(params, response) {
        console.dir(params);
        const pathQuery = GenericHelper.splitPathQuery(params.original_path_and_query_string);

        //Check to see if the hostname and port exist, and if so appen path and query data appropriately
        if (this.urlList[params.hostname_and_port]) {
            let entryAdded = false;
            const malUrlData = this.urlList[params.hostname_and_port];

            if (!malUrlData.paths.find(val => val === pathQuery.path)) {
                malUrlData.paths.push(pathQuery.path);
                entryAdded = true;
            }                

            if (!malUrlData.query.find(val => val === pathQuery.query)) {
                malUrlData.query.push(pathQuery.query);
                entryAdded = true;
            }                

            if (!malUrlData.fullPath[pathQuery.fullPath]) {
                malUrlData.fullPath[pathQuery.fullPath] = {hits: 0};
                entryAdded = true;
            }
            
            return (entryAdded) 
                ? this.buildOutputData(params, response.status = 200, {urlList: this.urlList})
                : this.buildOutputData(params, response = 422, {errorMessage: 'Trying to insert a duplicate record.'});
        } else {
            const objToAdd = {
                paths: new Array(pathQuery.path),
                query: new Array(pathQuery.query),
                fullPath: {}
            };            
            objToAdd.fullPath[params.original_path_and_query_string] = {hits: 0};
            this.urlList[params.hostname_and_port] = objToAdd;            
        }
        return this.buildOutputData(params, response.status = 201, {urlList: this.urlList});
    }
}
