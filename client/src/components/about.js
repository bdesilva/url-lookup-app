import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div className='content-body'>
        <div>
          <div className='row'>
            <div className='row' />
            <div className='col s12 m4 l2'>
              {/* <!-- Left sidebar panel --> */}
            </div>
            <div className='col s12 m4 l1'>
              {/* <!-- Left sidebar panel --> */}
            </div>
            <div className='col s12 m8 l9'>
              {/* <!-- Main content  --> */}
              <div className='row'>
                <div className='col s12 m6 l6'>
                  <div className='card hoverable'>
                    <div className='card-content'>
                      <span className='card-title'>About Application</span>
                      <p>A URL service lookup tool</p>                      
                      <p>GitHub link for this project: <a href="https://github.com/bdesilva/url-lookup-app">https://github.com/bdesilva/url-lookup-app</a></p>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
  }
}

