import React, { Component } from "react";
import Map from "./Map";
import Sidenav from "./Sidenav";
import { getAlgorithmUtils } from "./../utils";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallTiles: [],
      visited: [],
      options: {
        algorithm: "depthFirstSearch"
      }
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
    let { wallTiles, visited, options } = this.state;
    const utils = getAlgorithmUtils(sideLength, wallTiles, visited);
    const {
      isWin,
      //isBorder,
      //isWall,
      isVisited,
      generateNodes,
      visitNode
    } = utils;

    sideLength = parseInt(sideLength);

    const algorithms = {
      depthFirstSearch(currentTile, depth) {
        if (isVisited(currentTile)) return false;
        if (depth === 0) return false;
        if (isWin(currentTile)) {
          return true;
        }

        visitNode(currentTile);

        const childNodes = generateNodes(currentTile);
        for (let i = 0; i < childNodes.length; ++i) {
          if (algorithms.depthFirstSearch(childNodes[i], depth - 1))
            return true;
        }
      }
    };

    algorithms[options.algorithm](startTile, sideLength * sideLength);
    this.setState({ visited: visited });
  };

  clearVisited = () => {
    this.setState({ visited: [] });
  };

  clearWalls = () => {
    this.setState({ wallTiles: [] });
  };

  render() {
    return (
      <div className="Board">
        <Sidenav
          handleRun={() =>
            this.runAlgorithm(parseInt(this.props.sideLength) + 1)
          }
          handleClearPath={this.clearVisited}
          handleClearWalls={this.clearWalls}
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
