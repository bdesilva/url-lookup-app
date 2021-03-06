/* LoginController class to handle authorization functionality */

import BaseController from './base-controller';

export class LoginController extends BaseController {
  constructor(enforcer, config) {
    super();
    if (enforcer != this.singletonEnforcer) throw "Cannot construct LoginController";
    this.users = config.loginControllerOptions;
  }

  authorize(params, response) {
    return this.users[params.username] === params.password;
  }
}
