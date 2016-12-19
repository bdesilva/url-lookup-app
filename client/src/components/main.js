import React from 'react';
import { browserHistory } from 'react-router';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ''
    }
  }

  componentDidMount() {
    if ($ !== undefined) {
      $('.collapsible').collapsible();
    }
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  searchUrl(event) {
    event.preventDefault();
    console.log(`Searching for ${this.state.url}`);
  }

  addUrl(event) {
    event.preventDefault();
    console.log(`Adding ${this.state.url}`);
  }

  render() {
    return (
      <div className='content-body'>
        <div>
          <h1>Search for a url...</h1>
          <div className='row'>
            <div className='col s12 m4 l3'>
              {/* <!-- Left sidebar panel --> */}
            </div>

            <div className='col s12 m8 l9'>
              {/* <!-- Main content  --> */}
              <div className='row'>
                <div className='col s12 m6 l6'>
                  <div className='card hoverable'>
                    <div className='card-content'>
                      <span className='card-title'>URL Search</span>
                      <form>
                        <div className='row'>
                          <div className='input-field col s12 m12 l12'>
                            <input id='url' type='text' className='validate' value={this.state.url} onChange={::this.handleUrlChange} />
                          <label htmlFor='url' data-error={this.state.validError}>URL Lookup</label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className='card-action'>
                      <div className='col s12 m8 l6'>
                        <a href='#' onClick={::this.searchUrl} className='waves-effect waves-light btn'><i className='material-icons left'>search</i>Search</a>
                    </div>
                    <div className='col s12 m8 l6'>
                      <a href='#' onClick={::this.addUrl} className='waves-effect waves-light btn'><i className='material-icons left'>library_add</i>Add URL</a>
                  </div>
                </div>
              </div>
              <div className='row'>
                <ul className="collapsible popout" data-collapsible="accordion">
                  <li>
                    <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                    <div className="collapsible-body"><p>Lorem ipsum dolor sit amet.</p></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div >
      </div >
    );
  }
}

