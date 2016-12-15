import BaseController from './base-controller';

export class UrlInfoController extends BaseController {
    constructor(enforcer) {
        super();
        if (enforcer != this.singletonEnforcer) throw "Cannot construct LoginController";
        this.urlList = [];
    }

    getUrlData(params) {
        console.dir(params);
        return `Returned params: ${params.hostname_and_port}, ${params.original_path_and_query_string}`;
    }
}