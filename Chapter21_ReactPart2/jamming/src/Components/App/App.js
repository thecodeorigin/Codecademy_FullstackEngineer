import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist Name',
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  //Đã check và work
  addTrack(track) {
    // check track.id co ton tai khong, neu ko thi out luon
    if (!track.id) {
      console.log("function add track không được truyền track");
      return;
    }
    // check co con tai track trong tracklist khong
    let checkExist = this.state.playlistTracks.find(
      (existTrack) => existTrack.id === track.id
    );
    // if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    //   return;
    // }
    // neu checkExist ton tai thi out
    if (checkExist) return;
    // neu checkExist khong ton tai thi them
    let newTrackList = this.state.playlistTracks;
    newTrackList.push(track);
    this.setState({ playlistTracks: newTrackList });
  }

  //Đã check và work
  removeTrack(track) {
    // check tồn tại track
    if (!track.id) {
      console.log("function remove track không được truyền track");
      return;
    }
    //findIndex nếu không tồn tại thì trả về -1
    let existIndex = this.state.playlistTracks.findIndex(
      (existTrack) => track.id === existTrack.id
    );
    //nếu không tồn tại thì thoát function
    if (existIndex === -1) return;
    //nếu tồn tại -> xoá
    let newTrackList = this.state.playlistTracks;
    newTrackList.splice(existIndex, 1);
    this.setState({ playlistTracks: newTrackList });

    console.log("test xoa track", this.state);
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
      })
    })
  }
  

  search(searchTerm) {
    Spotify.search(searchTerm)
    // vì kết quả trả về là một promise nên phải then mới xài tiếp result của nó được
    .then(results => this.setState({ searchResults: results}))
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
