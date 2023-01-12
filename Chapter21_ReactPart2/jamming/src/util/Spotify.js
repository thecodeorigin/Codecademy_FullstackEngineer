import React from 'react';
let userAccessToken 

class Spotify extends React.Component {
  getAccessToken() {
    if(userAccessToken) return userAccessToken
  }

}

export default Spotify