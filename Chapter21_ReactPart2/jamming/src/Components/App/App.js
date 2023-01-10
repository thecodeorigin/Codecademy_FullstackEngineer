import React from "react";
import "./App.css";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";
import { SearchBar } from "../SearchBar/SearchBar";
import {sampleSearchResult} from './sampleData'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: sampleSearchResult };
  }


  render() {
    return (
      <div>
        <h1>
          Ja<span class="highlight">mmm</span>ing
        </h1>
        <div class="App">
          <SearchBar />
          <div class="App-playlist"></div>
          
          <SearchResults searchResults={this.state.searchResults} />
          <Playlist />
        </div>
      </div>
    );
  }
}

export default App;
