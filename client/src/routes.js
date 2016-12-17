import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Login from './components/login';
import Main from './components/main';
import About from './components/about';
import NotFound from './components/not-found';

const routes = (
  <div>    
    <Route path="/" component={App}>
      <IndexRoute component={Login} />
      <Route path="/about" component={About} />      
      <Route path="/main" component={Main} />      
    </Route>
    <Route path="*" component={NotFound} />
  </div>
);

export default routes;
