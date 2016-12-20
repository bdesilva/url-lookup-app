import { expect } from 'chai';
import BaseController from '../../src/controllers/base-controller';
import ControllerFactory from '../../src/controllers/controller-factory';

describe('LoginController', () => {
    let controllerFactory, loginController;

    beforeEach(() => {
        process.env['NODE_ENV'] = 'test';
        controllerFactory = new ControllerFactory();
        loginController = controllerFactory.createController('loginController');
    });

    afterEach(() => {
        process.env['NODE_ENV'] = 'prod';
        controllerFactory = undefined;
        loginController = undefined;
    });

    it('calls the authorize method unsuccessfully', async () => {
        const authorized = await loginController.authorize({
            username: 'tester', password: 'somepassword'
        }, { status: 0 });

        expect(authorized).to.eql(false);
    });

    it('calls the authorize method successfully', async () => {
        const authorized = await loginController.authorize({
            username: 'test', password: 'testadmin'
        }, { status: 0 });

        expect(authorized).to.eql(true);
    });
});
