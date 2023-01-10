import React from "react";
const clientID = '146f2b77be1d479591b417fb96980fcc'
const redirectURI = 'http://localhost:3000/'
let accessToken;



class Spotify extends React.Component{
    getAccessToken() {
        if(accessToken){
            return accessToken;
        }

        //check for access token math
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        
        console.log('phat hien accessTokenMatch: ',accessTokenMatch)
        //If the access token and expiration time are in the URL
        if(accessTokenMatch && expiresInMatch) {
            //Set the access token value
            accessToken = accessTokenMatch[1];
            //Set a variable for expiration time
            const expiresIn = Number(expiresInMatch[1])
            // Set the access token to expire at the value for expiration time
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            //Clear the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired
            window.history.pushState('Access Token', null, '/');

            return accessToken;
        } else {
            window.localtion = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
    }

    search(term) {
        console.log('da vao search Spotify')
        const accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers: {Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return [];
            }
            return jsonResponse.tracks.item.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    }

    savePlaylist(name, trackUris) {
        if(!name || !trackUris.length){
          return;
        }
    
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;
    
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
          userId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
          })
        }).then(response => response.json()
        ).then(jsonResponse => {
          const playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
          })
        })
      }
}


export default Spotify