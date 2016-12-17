import React from 'react';
import { browserHistory } from 'react-router';
 
export default class Header extends React.Component {
  componentDidMount () {
    if ($ !== undefined) {
      $('.button-collapse').sideNav();
    }
  }

  render() {
    return (      
      <div className='navbar-fixed'>
        <nav>
          <div className='nav-wrapper'>
            <a href='#' className='brand-logo'>React-Materialize Demo</a>
            <a href='#' data-activates='mobile-demo' className='button-collapse'><i className='material-icons'>menu</i></a>
            <ul className='right hide-on-med-and-down'>
              <li><a href='#' onClick={() => browserHistory.push('/')}>Home</a></li>
              <li><a href='#' onClick={() => browserHistory.push('/about')}>About</a></li>
            </ul>
            <ul className='side-nav' id='mobile-demo'>
              <li><a href='#' onClick={() => browserHistory.push('/')}>Home</a></li>
              <li><a href='#' onClick={() => browserHistory.push('/about')}>About</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
