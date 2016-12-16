/* Routes class to handle delegation of routing handlers */

import ControllerFactory from './controllers/controller-factory';

const controllerFactory = new ControllerFactory();
const controllers = {
  loginController: controllerFactory.createController('loginController'),
  urlInfoController: controllerFactory.createController('urlInfoController')
};

export class Routes {
  async index(next) {
    this.body = '<h1>Url Lookup Server</h1>';
    await next;
  }

  async login(next) {
    const authorized = await controllers.loginController.authorize(this.params, this.response);
    this.body = authorized;
    await next;
  }

  async getUrlInfo(next) {
    const urlInfo = await controllers.urlInfoController.getUrlData(this.params, this.response);
    this.body = urlInfo;
    await next;
  }

  async postUrlInfo(next) {
    const result = await controllers.urlInfoController.postUrlData(this.request.body, this.response);
    this.body = result;
    await next;
  }
}
