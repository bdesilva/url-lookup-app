export class TestModel {
    constructor(config) {
        this.client = require('../../config/default-list.json');
    }

    refreshList() {
        delete require.cache[require.resolve('../../config/default-list.json')];
        this.client = require('../../config/default-list.json');
    }

    storeUrl(key, data) {
        this.refreshList();
        this.client[key] = JSON.stringify(data);
    }

    getUrl(key) {  
        this.refreshList();
        return Promise.resolve(JSON.stringify(this.client[key]));
    }

    getAllKeys() {
        this.refreshList();
        return Promise.resolve([
            'www.google.com',
            'example.com',
            'example.com:8400'
        ]);
    }
}
