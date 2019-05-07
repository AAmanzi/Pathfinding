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

  runAlgorithm = startTile => {
    let { sideLength } = this.props;
    let { visited, wallTiles } = this.state;

    sideLength = parseInt(sideLength);
    const isWin = tile => {
      return tile === sideLength * sideLength - 2;
    };
    const isWall = tile => {
      if (
        (tile < sideLength ||
          tile >= sideLength * (sideLength - 1) ||
          tile % sideLength === 0 ||
          (tile + 1) % sideLength === 0) &&
        tile !== sideLength * sideLength - 2
      )
        return true;
      return wallTiles.find(wallTile => wallTile === tile) !== undefined;
    };
    const isVisited = tile => {
      return (
        visited.find(element => {
          return element === tile;
        }) !== undefined
      );
    };
    const generateNodes = tile => {
      const right = tile + 1;
      const down = tile + sideLength;
      const left = tile - 1;
      const up = tile - sideLength;
      const childNodes = [];

      if (isWall(right) === false) childNodes.push(right);
      if (isWall(down) === false) childNodes.push(down);
      if (isWall(left) === false) childNodes.push(left);
      if (isWall(up) === false) childNodes.push(up);

      return childNodes;
    };

    const visitNode = node => {
      visited.push(node);
    };

    const recursion = (currentTile, depth) => {
      if (isVisited(currentTile)) return false;
      if (depth === 0) return false;
      if (isWin(currentTile)) {
        return true;
      }

      visitNode(currentTile);

      const childNodes = generateNodes(currentTile);
      for (let i = 0; i < childNodes.length; ++i) {
        if (recursion(childNodes[i], depth - 1)) return true;
      }
    };

    recursion(startTile, sideLength * sideLength);
    this.setState({ visited: visited });
  };

  clearVisited = () => {
    this.setState({visited: []});
  }

  render() {
    return (
      <div className="Board">
        <Sidenav
          handleRun={() =>
            this.runAlgorithm(parseInt(this.props.sideLength) + 1)
          }
          handleClear={this.clearVisited}
        />
        <Map
          sideLength={this.props.sideLength}
          handleDraw={this.handleDraw}
          wallTiles={this.state.wallTiles}
          visitedTiles={this.state.visited}
        />
      </div>
    );
  }
}

export default Board;
