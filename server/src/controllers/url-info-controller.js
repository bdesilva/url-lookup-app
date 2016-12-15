/* UrlInfoController class to handle url functionality */

import BaseController from './base-controller';

export class UrlInfoController extends BaseController {
    constructor(enforcer) {
        super();
        if (enforcer != this.singletonEnforcer) throw "Cannot construct UrlInfoController";
        this.urlList = {
            'www.google.com': {
                paths: ['/'],
                query: ['']
            },
            'example.com': {
                paths: ['/badurl'],
                query: ''
            },
            'example.com:8400': {
                paths: ['/hi'],
                query: ''
            }
        };
    }

    getUrlData(params) {
        let result = {};
        // return `Returned params: ${params.hostname_and_port}, ${params.original_path_and_query_string}`;
        if (this.urlList[params.hostname_and_port]) {
            const malUrlData = this.urlList[params.hostname_and_port];
            if (params.original_path_and_query_string) {
                //Split path and query from original data
                const split = params.original_path_and_query_string.split('?');
                const path = `/${split[0]}`;
                const query = split[1];

                //Analyze user path in depth by running a first pass to find an exact path                
                if (malUrlData.paths.find(val => val === path))
                    return this.buildOutputData(true, params);

                //Next, if no match is found, start splitting the path in order to find a possible match on a substring
                path.split('/').reduce((a, b) => {
                    console.log(`prev: ${a}, next: ${b}`);
                });
            }
        }
    }

    buildOutputData(isMalicious, params) {
        return `${JSON.stringify(params)}: isMalicious: ${isMalicious}`;
    }
}
