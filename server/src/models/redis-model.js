import Bluebird from 'bluebird';
import Redis from 'redis';
Bluebird.promisifyAll(Redis.RedisClient.prototype);

export class RedisModel {
    constructor(config) {
        const initialList = require('../../config/default-list.json');
        this.client = Redis.createClient(config.redisPort, config.redisHost);

        this.client.on('error', (err) => {
            console.log(`Redis error: ${err}`);
        });

        this.insertDefaultUrls(initialList);
    }

    storeUrl(key, data) {
        this.client.set(key, JSON.stringify(data));
    }

    getUrl(key) {
        return this.client.getAsync(key);
    }

    //Insert default urls to redis cluster
    insertDefaultUrls(initialList) {
        Object.keys(initialList).forEach(key => {
            this.storeUrl(key, initialList[key]);
        });
    }
}
