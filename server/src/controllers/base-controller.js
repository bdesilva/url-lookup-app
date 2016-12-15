/* BaseController class */

const singletonEnforcer = Symbol();
const singletonMap = new Map();

export default class BaseController {
    constructor() {
        this.singletonMap = singletonMap;
        this.singletonEnforcer = singletonEnforcer;
    }    
}
