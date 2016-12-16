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
                paths: ['/badurl', '/badurl/haha'],
                query: ''
            },
            'example.com:8400': {
                paths: ['/hi'],
                query: ''
            }
        };
    }

    getUrlData(params) {
        //Check to see if there is a match on the hostname and port
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
                //starting with the first path substring
                let url = '';
                for (let point of path.split('/')) {
                    if (point !== '') {
                        url += `/${point}`;
                        // console.log(url);
                        // console.log(url === malUrlData.paths.find(val => val === url));
                        if (malUrlData.paths.find(val => val === url))
                            return this.buildOutputData(true, params);
                    }
                }
            }
        } else {
            return this.buildOutputData(false, params);
        }
    }

    buildOutputData(isMalicious, params) {
        console.log('here');
        return `${JSON.stringify(params)}: isMalicious: ${isMalicious}`;
    }
}
