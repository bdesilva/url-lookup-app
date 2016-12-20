import React from 'react';

export default class BackgroundImage extends React.Component {
  render() {
    const urls = {
      'login': '/img/opendns.png',
      'about': '/img/opendns.png',
      'main': '/img/opendns.png'
    };
    
   let src = urls[this.props.page];
  
   return <img src={src} className='other' />;
  }
}
