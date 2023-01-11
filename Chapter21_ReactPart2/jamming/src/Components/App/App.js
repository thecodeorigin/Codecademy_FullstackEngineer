import React from "react";
import "./App.css";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import {
  sampleSearchResult,
  samplePlaylistTracks,
  samplePlaylistName,
} from "./sampleData";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: sampleSearchResult,
      playlistName: samplePlaylistName,
      playlistTracks: samplePlaylistTracks,
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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

  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          <SearchBar />
          <div class="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
