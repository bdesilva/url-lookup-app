/* Server class */

import 'babel-polyfill';
import koa from 'koa';
import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'kcors';
import { Router } from './router';

const env = process.env.NODE_ENV || 'dev'
  , config = require(`../config/${env}.json`);

class KoaServer {
  constructor(config) {
    this.app, this.router = {};
    this.config = config;
    this.initialize();
  }

  initialize() {
    this.app = new koa();
    this.router = new Router();
    this.setupMiddleware();
  }
  
  setupMiddleware() {    
    this.app.use(cors(config.corsOptions));
    this.app.use(parser());
    this.app.use(logger());
    this.app.use(this.router.koaRouter.routes());
  }

  startServer() {
    this.app.listen(this.config.port);
    console.log(`Koa server listening on port ${this.config.port}`);
  }
}

const server = new KoaServer(config);
server.startServer();
