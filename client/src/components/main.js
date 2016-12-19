import React from 'react';
import { browserHistory } from 'react-router';
import Url from 'url';
import UrlEncode from 'urlencode';
import Fetch from 'node-fetch';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      isMalicious: false,
      hits: 0,
      originalParams: {},
      status: 0,
      resultsPanel: false
    }
  }

  componentDidMount() {
    if ($ !== undefined) {
      $('.collapsible').collapsible();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if ($ !== undefined) {
      $('.collapsible').collapsible();
    }
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value, resultsPanel: false });
  }

  formatUrl(event) {
    let formattedUrl;
    if (!event.target.value.includes('http') || !event.target.value.includes('https')) {
      formattedUrl = event.target.value.replace(/http:\/\//g, '');
      this.setState({ url: `http:\/\/${formattedUrl}` });
    }
  }

  async searchUrl(event) {
    event.preventDefault();
    console.log(`Searching for ${this.state.url}`);
    const url = Url.parse(this.state.url, true);
    const hostNameAndPort = url.host;
    const pathAndQueryString = UrlEncode(url.path);
    console.log(hostNameAndPort);
    console.log(pathAndQueryString);
    const res = await Fetch(`http://localhost:8008/1/url-info/${hostNameAndPort}/${pathAndQueryString}`,
      {
        method: 'GET'
      });
    const urlData = await res.json();
    console.dir(urlData);
    this.setState({
      isMalicious: urlData.data.isMalicious,
      hits: urlData.data.hits,
      originalParams: urlData.originalParams,
      status: urlData.status,
      resultsPanel: true
    });
  }

  renderUrlResults() {
    let isMaliciousUrlClass = 'not-malicious';
    let isMaliciousUrlString = 'is not malicious';
    let isMaliciousUrlGrid = 'col s12 m12 l12'

    if (this.state.isMalicious) {
      isMaliciousUrlClass = 'malicious';
      isMaliciousUrlString = 'is malicious';
      isMaliciousUrlGrid = 'col s12 m9 l9';
    }

    return (
      <div className={isMaliciousUrlClass}>
        <div className={isMaliciousUrlGrid}>
          <p>This site: {this.state.url} {isMaliciousUrlString}.</p>
        </div>
        {(!this.state.isMalicious) 
            ? <div className='col s12 m3 l3'>
                <a className="btn-floating btn-large waves-effect waves-light red">Go!</a>
              </div>
        : <div></div>}
      </div>
    );
  }

  addUrl(event) {
    event.preventDefault();
    console.log(`Adding ${this.state.url}`);
  }

  render() {
    let collapsiblePanelClass = (this.state.resultsPanel)
      ? 'collapsible-header active'
      : 'collapsible-header';

    return (
        <div>
          <h1>Search for a url...</h1>
          <div className='row'>
            <div className="valign-wrapper">
            <div className='col s12 m9 l12 valign'>
              {/* <!-- Main content  --> */}
              <div className='row'>
                <div className='col s12 m6 l6'>
                  <div className='card hoverable'>
                    <div className='card-content'>
                      <span className='card-title'>URL Search</span>
                      <form>
                        <div className='row'>
                          <div className='input-field col s12 m12 l12'>
                            <input id='url' type='text' className='validate' value={this.state.url} onChange={::this.handleUrlChange}
                              onBlur={::this.formatUrl} />
                          <label htmlFor='url' data-error={this.state.validError}>Enter a URL to search</label>
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
              </div>
              <div className='row valign'>
                <ul className="collapsible popout" data-collapsible="accordion">
                  <li>
                    <div className={collapsiblePanelClass}><i className="material-icons">filter_drama</i>First</div>
                    <div className="collapsible-body c-body">
                      {::this.renderUrlResults()}
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">place</i>Second</div>
                    <div className="collapsible-body c-body">
                      <ul className="collection">
                        <li className="collection-item avatar">
                          <img src="images/yuna.jpg" alt="" className="circle" />
                          <span className="title">Title</span>
                          <p>First Line <br />
                            Second Line
                          </p>
                          <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle">folder</i>
                          <span className="title">Title</span>
                          <p>First Line <br />
                            Second Line
                          </p>
                          <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle green">insert_chart</i>
                          <span className="title">Title</span>
                          <p>First Line <br />
                            Second Line
                          </p>
                          <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                        </li>
                        <li className="collection-item avatar">
                          <i className="material-icons circle red">play_arrow</i>
                          <span className="title">Title</span>
                          <p>First Line <br />
                            Second Line
                          </p>
                          <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                    <div className="collapsible-body c-body"><p>Lorem ipsum dolor sit amet.</p></div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div >
    );
  }
}

