/* BaseController class */

const singletonEnforcer = Symbol();
const singletonMap = new Map();

export default class BaseController {
    constructor() {
        this.singletonMap = singletonMap;
        this.singletonEnforcer = singletonEnforcer;
    }

    buildOutputData(params, status, data) {
        return {
            status: status,
            originalUrl: `${params.hostname_and_port}${params.original_path_and_query_string}`,
            originalParams: params,
            data: data
        };
    }
}
