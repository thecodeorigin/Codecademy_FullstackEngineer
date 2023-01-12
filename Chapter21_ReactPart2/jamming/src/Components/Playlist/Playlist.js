import React from "react";
import "./Playlist.css";
import { TrackList } from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    let newPlaylistName = e.target.value;

    // Neu khong co thi return, ko bi loi
    if(!this.props.onNameChange) return;

    this.props.onNameChange(newPlaylistName)
  }

  render() {
    return (
      <div class="Playlist">
        <input value={this.props.playlistName} onChange={this.handleNameChange}/>
        {/* <!-- Add a TrackList component --> */}
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <button class="Playlist-save" onClick={this.props.onSave ? this.props.onSave : ''}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
