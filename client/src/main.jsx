import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from './routes';

let router = (
  <Router 
    history={browserHistory}
    routes={routes}
  />
);

ReactDOM.render(
  router, document.getElementById('react-mount'));