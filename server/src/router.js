/* Router class */

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
    this.router.post('/login', this.routes.login);
    this.router.get('/1/url-info/:hostname_and_port/:original_path_and_query_string', this.routes.getUrlInfo);
    this.router.get('/1/url-info/getAllData', this.routes.getAllUrlInfo);
    this.router.post('/1/url-info/', this.routes.postUrlInfo);
  }
}
