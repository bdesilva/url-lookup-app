import { RedisModel } from './redis-model';
import { TestModel } from './test-model';

export default class RepositoryFactory {
    static create(config) {
        switch (config.dataStore) {
            case 'redis': {
                const {redisHost, redisPort} = config;
                return new RedisModel({redisHost, redisPort});
            }
            case 'test': {
                const {redisHost, redisPort} = config;
                return new TestModel({redisHost, redisPort});
            }
        }
    }
}
