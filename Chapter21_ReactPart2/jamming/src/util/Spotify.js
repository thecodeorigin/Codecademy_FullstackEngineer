const clientId = "146f2b77be1d479591b417fb96980fcc";
const redirectUri = "http://localhost:3000";

let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    //check for the access token match in URL (like the instructions in codecademy)
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // This clears the parameters, allowing us to grab a new access token when it expires.
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      // If we couldn't find the access token and expiresIn we redirect users to URL
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        //if there wasn't any array so return an empty array
        if (!jsonResponse.tracks) return [];
        //else return array of tracks
        // vì là return một object mà câu lệnh ở trong {} sẽ bị arrow function nghĩ là một tập hợp lệnh nên muốn trả về object phải thêm ngoặc tròn () ở ngoài {} để thể hiện object
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          album: track.album.name,
          artist: track.artists[0].name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
