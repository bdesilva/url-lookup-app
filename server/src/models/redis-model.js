import Bluebird from 'bluebird';
import Redis from 'redis';
Bluebird.promisifyAll(Redis.RedisClient.prototype);

export class RedisModel {
    constructor(config) {
        // this.client = Redis.createClient({host: 'redis-master', port: '6379', password: 'my_password'});
        this.client = Redis.createClient('6379', 'redis');

        this.client.on('error', (err) => {
            console.log(`Redis error: ${err}`);
        });
    }

    storeUrl(key, data) {
        this.client.set(key, JSON.stringify(data));
    }

    getUrl(key) {
        return this.client.getAsync(key);
    }
}
