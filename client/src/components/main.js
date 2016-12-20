import React from 'react';
import { browserHistory } from 'react-router';
import JSONTree from 'react-json-tree'
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
      defaultState: true,
      buttonDisabled: true,
      postData: {},
      allData: {}
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
    (this.state.url === '') ? this.setState({ buttonDisabled: true }) : this.setState({ buttonDisabled: false });
  }

  async searchUrl(event) {
    event.preventDefault();
    const url = Url.parse(this.state.url, true);
    const hostNameAndPort = url.host;
    const pathAndQueryString = UrlEncode(url.path);
    const res = await Fetch(`http://localhost:8008/1/url-info/${hostNameAndPort}/${pathAndQueryString}`,
      {
        method: 'GET'
      });
    const urlData = await res.json();
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

  async submitUrl(event) {
    event.preventDefault();
    const url = Url.parse(this.state.url, true);
    const hostNameAndPort = url.host;
    const pathAndQueryString = url.path;

    const res = await Fetch('http://localhost:8008/1/url-info',
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ "hostname_and_port": hostNameAndPort, "original_path_and_query_string": pathAndQueryString }),
        headers: { "Content-Type": "application/json", Accept: 'application/json' }
      });
    const postData = await res.json();
    this.setState({ postData: postData });
  }

  async getUrlList(event) {
    event.preventDefault();
    const res = await Fetch('http://localhost:8008/1/url-info/getAllData',
      {
        method: 'GET'
      });
    const allData = await res.json();
    this.setState({ allData: allData });
  }

  renderPostDataHeader(postData) {
    return (postData && postData.errorMessage)
      ? (
        <span>Record <strong>{this.state.url}</strong> alreadys exists!</span>
      )
      : (
        <span>Adding <strong>{this.state.url}</strong> to the malicious url list</span>
      );
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

  render() {
    let collapsiblePanelClass = (this.state.resultsPanel)
      ? 'collapsible-header active'
      : 'collapsible-header';

    let buttonStyles = (this.state.buttonDisabled)
      ? 'waves-effect waves-light btn disabled'
      : 'waves-effect waves-light btn';

    // Theme for json viewer
    const jsonTreeTheme = {
      scheme: 'monokai',
      author: 'wimer hazenberg (http://www.monokai.nl)',
      base00: '#272822',
      base01: '#383830',
      base02: '#49483e',
      base03: '#75715e',
      base04: '#a59f85',
      base05: '#f8f8f2',
      base06: '#f5f4f1',
      base07: '#f9f8f5',
      base08: '#f92672',
      base09: '#fd971f',
      base0A: '#f4bf75',
      base0B: '#a6e22e',
      base0C: '#a1efe4',
      base0D: '#66d9ef',
      base0E: '#ae81ff',
      base0F: '#cc6633'
    };

    return (
      <div>
        <div>
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
                        <div className='col s12 m2 l4'>
                          <a href='#' onClick={::this.searchUrl} className={buttonStyles}><i className='material-icons left'>search</i>Search</a>
                      </div>
                      <div className='col s12 m2 l4' onClick={() => $('#addUrlModal').openModal()}>
                        <a onClick={::this.submitUrl} className={buttonStyles}><i className='material-icons left'>library_add</i>Add URL</a>                        
                    </div>
                    <div className='col s12 m2 l4' onClick={() => $('#listUrlsModal').openModal()}>
                      <a href='#' onClick={::this.getUrlList} className={buttonStyles}><i className='material-icons left'>list</i>Get URL List</a>
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
      <div id="addUrlModal" className="modal modal-fixed-footer">
        <div className="modal-content">
          <div className='card hoverable'>
            <div className='card-content'>
              <span className='card-title'>{::this.renderPostDataHeader(this.state.postData.data)}</span>
              <JSONTree data={this.state.postData} theme={jsonTreeTheme} isLightTheme={false} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">OK</a>
        </div>
      </div>
      <div id="listUrlsModal" className="modal bottom-sheet">
        <div className="modal-content">
          <div className='card hoverable'>
            <div className='card-content'>
              <span className='card-title'>All Data</span>
              <JSONTree data={this.state.allData} theme={jsonTreeTheme} isLightTheme={false} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
      </div >
    );
  }
}

