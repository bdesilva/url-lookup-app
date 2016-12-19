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
      resultsPanel: false,
      defaultState: true
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
    this.setState({ url: event.target.value, resultsPanel: false, defaultState: true });
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
      defaultState: false,
      isMalicious: urlData.data.isMalicious,
      hits: urlData.data.hits,
      restCall: `http://localhost:8008/1/url-info/${hostNameAndPort}/${pathAndQueryString}`,
      originalParams: urlData.originalParams,
      status: urlData.status,
      resultsPanel: true
    });
  }

  renderUrlResults() {
    let isMaliciousUrlClass = 'malicious-default';
    let isMaliciousUrlString = 'Please search for a URL to gain access to url data.';
    let isMaliciousUrlGrid = 'col s12 m12 l12'

    if (this.state.isMalicious) {
      isMaliciousUrlClass = 'malicious';
      isMaliciousUrlString = `This site: ${this.state.url} is malicious.`;
      isMaliciousUrlGrid = 'col s12 m9 l12';
    }

    if (!this.state.isMalicious && !this.state.defaultState) {
      isMaliciousUrlClass = 'not-malicious';
      isMaliciousUrlString = `This site: ${this.state.url} is not malicious.`;
      isMaliciousUrlGrid = 'col s12 m9 l10';
    }

    return (
      <div className={isMaliciousUrlClass}>
        <div className={isMaliciousUrlGrid}>
          <p>{isMaliciousUrlString}</p>
        </div>
        {(!this.state.isMalicious && !this.state.defaultState)
          ? <div className='col s12 m3 l2'>
            <a href='#' onClick={() => window.open(this.state.url, '_blank')} className="btn-floating btn-large waves-effect waves-light red">Go!</a>
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
                            <input id='url' type='text' value={this.state.url} onChange={::this.handleUrlChange}
                              onBlur={::this.formatUrl} />
                          <label htmlFor='url'>Enter a URL to search</label>
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
                  <div className={collapsiblePanelClass}><i className="material-icons">filter_drama</i>URL Search Results</div>
                  <div className="collapsible-body c-body">
                    {::this.renderUrlResults()}
                    </div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">place</i>URL Search Data</div>
                  <div className="collapsible-body c-body">
                    <ul className="collection">
                      <li className="collection-item avatar">
                        <i className="material-icons circle red">dns</i>
                        <span className="title">Url searched</span>
                        <p>{this.state.url} <br />
                          isMalicious: {this.state.isMalicious.toString()}
                        </p>
                      </li>
                      {(this.state.hits > 0) ?
                        <li className="collection-item avatar">
                          <i className="material-icons circle blue">add_alert</i>
                          <span className="title">Hits for exact match to url searched</span>
                          <p>{this.state.hits} hits <br />
                          </p>
                        </li>
                        : <span></span>
                      }
                      <li className="collection-item avatar">
                        <i className="material-icons circle green">insert_chart</i>
                        <span className="title">REST call details</span>
                        <p><span className="truncate">REST call: {this.state.restCall}</span><br />
                          Status code: {this.state.status}
                        </p>
                      </li>
                      <li className="collection-item avatar">
                        <i className="material-icons circle brown">settings_remote</i>
                        <span className="title">Parameter details</span>
                        <p>Hostname and port: {this.state.originalParams.hostname_and_port}<br />
                          Path and query string: {this.state.originalParams.original_path_and_query_string}<br />
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div >
      </div >
    );
  }
}

