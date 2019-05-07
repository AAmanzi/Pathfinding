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

  handleDraw = index => {
    this.setState(prevState => {
      let tmpTiles = [...prevState.wallTiles];
      let newTiles = tmpTiles.filter(tile => tile !== index);

      if (!tmpTiles.find(tile => tile === index)) newTiles.push(index);

      return {
        wallTiles: newTiles
      };
    });
  };

  render() {
    return (
      <div className="Board">
        <Sidenav />
        <Map
          sideLength="25"
          handleDraw={this.handleDraw}
          wallTiles={this.state.wallTiles}
          visitedTiles={this.state.visited}
        />
      </div>
    );
  }
}

export default Board;
