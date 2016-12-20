import React from 'react';

export default class BackgroundImage extends React.Component {
  render() {
    const urls = {
      'login': 'http://orig06.deviantart.net/ee48/f/2012/048/4/f/opendns_by_ghigo1972-d4q02ik.png',
      'about': 'http://orig06.deviantart.net/ee48/f/2012/048/4/f/opendns_by_ghigo1972-d4q02ik.png',
      'main': 'http://orig06.deviantart.net/ee48/f/2012/048/4/f/opendns_by_ghigo1972-d4q02ik.png'
    };
    
   let src = urls[this.props.page];
  
   return <img src={src} className='other' />;
  }
}
