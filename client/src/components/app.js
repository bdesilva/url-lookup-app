import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import BackgroundImage from './background-image';
import Header from './header';
 
export default class App extends React.Component {
  constructor() {
    super();
  }

  renderNavigationPage(page, cssClass) {
    return (
      <ReactCSSTransitionGroup
          transitionName={cssClass}
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >          
        <BackgroundImage page={page} key={page} />          
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    let page = this.props.location.pathname.substr(1);
    if (page === '') page = 'login';

    let cssClass;
    if (page === 'login') {
      cssClass = {
        enter: 'login-enter',
        enterActive: 'login-enter-active',
        leave: 'login-leave',
        leaveActive: 'login-leave-active',
      };
    } else {
      cssClass = {
        enter: 'main-enter',
        enterActive: 'main-enter-active',
        leave: 'main-leave',
        leaveActive: 'main-leave-active',
      };
    }

    return (
      <div>
        <Header pathname={this.props.location.pathname}/>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={1500}
          transitionLeaveTimeout={1500}
        >
          {React.cloneElement(this.props.children, {key: page})}
        </ReactCSSTransitionGroup>        
        {::this.renderNavigationPage(page, cssClass)}
      </div>
    );
  }
}
