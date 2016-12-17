import React from 'react';

export default class BackgroundImage extends React.Component {
  render() {
    const urls = {
      'login': 'http://www.publicdomainpictures.net/pictures/10000/velka/1-1255449988dV2j.jpg',
      'about': 'http://photoeverywhere.co.uk/west/usa/hawaii/palm-trees-DSC_3986.jpg',
      'main': 'https://upload.wikimedia.org/wikipedia/commons/b/bf/Lano_Beach_-_Savai\'i,_2007.jpg'
    };

    // const styles = {
    //   'something': Styles.login,
    //   'something/main': Styles.main
    // };
    
   let src = urls[this.props.page];
  
   return <img src={src} className='other' />;
  }
}
