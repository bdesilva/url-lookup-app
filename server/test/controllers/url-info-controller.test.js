import { expect } from 'chai';
import BaseController from '../../src/controllers/base-controller';
import ControllerFactory from '../../src/controllers/controller-factory';

describe('UrlInfoController', () => {
    let controllerFactory, urlInfoController;

    beforeEach(() => {
        process.env['NODE_ENV'] = 'test';
        controllerFactory = new ControllerFactory();
        urlInfoController = controllerFactory.createController('urlInfoController');
    });

    afterEach(() => {
        process.env['NODE_ENV'] = 'prod';
        controllerFactory = undefined;
        urlInfoController = undefined;
    });

    it('calls the fetchUrl method successfully', async () => {
        const data = await urlInfoController.fetchUrl('example.com:8400');

        expect(data.paths).to.eql(['/', '/hi', '/hey']);
        expect(data.query).to.eql(['?some-flag=1']);
        expect(data.fullPath['/hey'].hits).to.eql(0);
    });

    it('calls the setUrl method to update an entry', () => {
        const data = urlInfoController.setUrl(
            { status: 0 },
            { updated: true },
            { hostname_and_port: 'example.com:8400', original_path_and_query_string: '/newrecord' },
            { fullPath: '/newrecord' }
        );

        expect(data.status).to.eql(200);
        expect(data.originalUrl).to.eql('example.com:8400/newrecord');
        expect(data.originalParams.hostname_and_port).to.eql('example.com:8400');
        expect(data.originalParams.original_path_and_query_string).to.eql('/newrecord');
        expect(data.data.successMessage).to.eql('Record updated.');
        expect(data.data.data.fullPath).to.eql('/newrecord');
    });

    it('calls the getAllUrlData method successfully', async () => {
        const data = await urlInfoController.getAllUrlData();

        expect(data['www.google.com']).to.exist;
        expect(data['example.com']).to.exist;
        expect(data['example.com:8400']).to.exist;
    });

    it('calls the getUrlData method gets an exact full url match', async () => {
        const data = await urlInfoController.getUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hi?activate=false&signal=1'
        }, {status: 0});

        expect(data.status).to.eql(200);
        expect(data.data.isMalicious).to.eql(true);
    });

    it('calls the getUrlData method gets an exact path match', async () => {
        const data = await urlInfoController.getUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hi'
        }, {status: 0});

        expect(data.status).to.eql(200);
        expect(data.data.isMalicious).to.eql(true);
    });

    it('calls the getUrlData method gets an exact root path match', async () => {
        const data = await urlInfoController.getUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/somenewpath'
        }, {status: 0});

        expect(data.status).to.eql(200);
        expect(data.data.isMalicious).to.eql(true);
    });

    it('calls the getUrlData method gets a substring path match', async () => {
        const data = await urlInfoController.getUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hithere/hey'
        }, {status: 0});

        expect(data.status).to.eql(200);
        expect(data.data.isMalicious).to.eql(true);
    });

    it('calls the postUrlData method sets a path on an existing url object', async () => {
        const data = await urlInfoController.postUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hithere/hey'
        }, {status: 0});
        
        expect(data.status).to.eql(200);
        expect(data.data.successMessage).to.eql('Record updated.');
        expect(data.data.data.paths).to.deep.include('/badurl/hithere/hey');
    });

    it('calls the postUrlData method sets a query on an existing url object', async () => {
        const data = await urlInfoController.postUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hithere?active=true'
        }, {status: 0});
        
        expect(data.status).to.eql(200);
        expect(data.data.successMessage).to.eql('Record updated.');
        expect(data.data.data.query).to.deep.include('?active=true');
    });

    it('calls the postUrlData method sets a fullpath entry on an existing url object', async () => {
        const data = await urlInfoController.postUrlData({
            hostname_and_port: 'example.com',
            original_path_and_query_string: '/badurl/hi?fast=true'
        }, {status: 0});

        expect(data.status).to.eql(200);
        expect(data.data.successMessage).to.eql('Record updated.');        
        expect(data.data.data.fullPath['/badurl/hi?fast=true']).to.eql({"hits":0});
    });
});
