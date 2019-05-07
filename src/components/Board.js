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
      isWall,
      isVisited,
      generateNodes,
      visitNode
    } = utils;

    const algorithms = {
      depthFirstSearch(currentTile) {
        if (isVisited(currentTile)) return false;
        if (isWin(currentTile)) {
          return true;
        }

        visitNode(currentTile);

        const childNodes = generateNodes(currentTile);
        for (let i = 0; i < childNodes.length; ++i) {
          if (algorithms.depthFirstSearch(childNodes[i])) return true;
        }
      },
      breadthFirstSearch(currentTile) {
        if (isVisited(currentTile)) return false;
        if (isWin(currentTile)) {
          return true;
        }
        visitNode(currentTile);
        let indexCurrent = 0;

        let childParentPairs = {};

        while (visited[indexCurrent] !== undefined) {
          let tile = visited[indexCurrent];
          indexCurrent++;
          if (isWin(tile)) {
            visited = [];
            while(childParentPairs[tile] !== startTile){
              tile = childParentPairs[tile];
              visited.push(tile);
            }
            visited.push(startTile);
            return true;
          }
          const childNodes = generateNodes(tile);
          childNodes.forEach(childTile => {
            if (isVisited(childTile) === false) {
              //TODO fix no-loop-func
              childParentPairs = {...childParentPairs, [childTile]: tile};
              visitNode(childTile);
            }
          });
        }
        
      }
    };

    if (isWall(startTile)) return;

    algorithms[options.algorithm](startTile);
    this.setState({ visited: visited });
  };

  clearVisited = () => {
    this.setState({ visited: [] });
  };

  clearWalls = () => {
    this.setState({ wallTiles: [] });
  };

  changeAlgorithm = event => {
    this.clearVisited();
    this.setState({ options: { algorithm: event.target.value } });
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
          handleAlgorithmChange={this.changeAlgorithm}
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
