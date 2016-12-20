import { expect } from 'chai';
import GenericHelpers from '../../src/helpers/generic-helper';

describe('GenericHelpers', () => {
    beforeEach(() => {
        process.env['NODE_ENV'] = 'test';        
    });

    afterEach(() => {
        process.env['NODE_ENV'] = 'prod';
    });

    it('splits the path query successfully', () => {
        const data = GenericHelpers.splitPathQuery('example.com:8400/badurl/hi?activate=false&signal=1');

        expect(data.path).to.eql('/example.com:8400/badurl/hi');
        expect(data.query).to.eql('?activate=false&signal=1');
        expect(data.fullPath).to.eql('example.com:8400/badurl/hi?activate=false&signal=1');
    });

    it('splits the path query without query params', () => {
        const data = GenericHelpers.splitPathQuery('example.com:8400/badurl/hi');
        
        expect(data.path).to.eql('/example.com:8400/badurl/hi');
        expect(data.query).to.eql('?undefined');
        expect(data.fullPath).to.eql('example.com:8400/badurl/hi');
    });

    it('splits the path query without path params', () => {
        const data = GenericHelpers.splitPathQuery('example.com:8400?activate=false&signal=1');
        
        expect(data.path).to.eql('/example.com:8400');
        expect(data.query).to.eql('?activate=false&signal=1');
        expect(data.fullPath).to.eql('example.com:8400?activate=false&signal=1');
    });
});
