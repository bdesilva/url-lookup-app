import BaseController from './base-controller';
import { LoginController } from './login-controller';
import { UrlInfoController } from './url-info-controller';

/* Factory class to ensure that a Singleton instance of a Controller is launched - verified by the Symbol feature */

export default class ControllerFactory extends BaseController {
    createController(controller) {
        switch (controller) {
            case 'loginController': {                
                return this.getInstance(LoginController.name, LoginController);
            }
            case 'urlInfoController': {
                return this.getInstance(UrlInfoController.name, UrlInfoController);
            }
        }
    }

    getInstance(name, controller) {
        if (!this.singletonMap.get(controller.name)) {
            this.singletonMap.set(controller.name, new controller(this.singletonEnforcer));
        }
        return this.singletonMap.get(controller.name);
    }
}
