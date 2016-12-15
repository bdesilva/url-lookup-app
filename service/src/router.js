import KoaRouter from 'koa-router';
import { Routes } from './routes';

export class Router {
  constructor() {
    this.router, this.routes = {};
    this.initializeRouter();
  }

  get koaRouter() {
    return this.router;
  }

  initializeRouter() {
    this.router = KoaRouter();
    this.routes = new Routes();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/', this.routes.index);
    //TODO: Enable POST route once CORS issue is fixed, revertign to GET for demo purposes.
    //this.router.post('/login', this.routes.login);
    this.router.get('/login/:username/:password', this.routes.login);
  }
}