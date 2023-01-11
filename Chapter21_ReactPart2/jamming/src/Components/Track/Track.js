import React from "react";
import "./Track.css";

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack() {
    const newSong = this.props.track;
    this.props.onAdd(newSong);
  }

  renderAction(isRemoval) {
    // não to vl -> nếu không truyền isRemoval -> undefined -> kết quả 2
    // nếu truyền isRemoval = false -> kết quả 2 lun
    if(isRemoval) {
      return <button className="Track-action">-</button>
    } else {
      return <button className="Track-action" onClick={this.addTrack}>+</button>
    }
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {/* <button className="Track-action"></button> */}
        {this.renderAction(this.props.isRemoval)}
      </div>
    );
  }
}

export default Track;
