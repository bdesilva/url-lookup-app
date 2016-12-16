/* LoginController class to handle authorization functionality */

import BaseController from './base-controller';

export class LoginController extends BaseController {
  constructor(enforcer) {
    super();
    if (enforcer != this.singletonEnforcer) throw "Cannot construct LoginController";
    this.users = {
      Ben: 'hi',
      Ann: 'hey'
    };
  }

  authorize(params, response) {
    console.dir(params);
    return this.users[params.username] === params.password;
  }
}
