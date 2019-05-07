import React, { Component } from "react";
import Map from "./Map";
import Sidenav from "./Sidenav";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallTiles: [],
      visited: []
    };
  }

  render() {
    return (
      <div className="Board">
        <Sidenav />
        <Map sideLength="25" />
      </div>
    );
  }
}

export default Board;
