import { LoginController } from './controllers/login-controller';

export class Routes {
  async index(next) {
    this.body = '<h1>Koa Rest Server</h1>';    
    await next;
  }

  async login(next) {
    const authorized = await new LoginController().authorize(this.params);
    this.body = authorized;
    await next;
  }
}
