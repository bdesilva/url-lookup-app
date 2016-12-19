import { RedisModel } from './redis-model';

export default class RepositoryFactory {
    static create(config) {
        switch (config.dataStore) {
            case 'redis': {
                const {redisHost, redisPort} = config;
                return new RedisModel({redisHost, redisPort});
            }
        }
    }
}