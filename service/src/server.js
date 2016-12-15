import 'babel-polyfill';
import koa from 'koa';
import parser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from 'koa-cors';
import { Router } from './router';

//TODO: Make the config dynamic to suit the environment
const config = require('../config/dev.json');

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
    //Disabling CORS till I figure out the Chrome issue with my REACT client.
    this.app.use(cors(this.config.corsOptions));
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
