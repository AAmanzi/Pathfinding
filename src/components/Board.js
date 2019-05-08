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
      searched: [],
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
    let { wallTiles, visited, searched, options } = this.state;
    const utils = getAlgorithmUtils(sideLength, wallTiles, visited);
    const {
      isWin,
      //isBorder,
      isWall,
      isVisited,
      generateNodes,
      visitNode
    } = utils;

    let childParentPairs = {};

    const algorithms = {
      depthFirstSearch(currentTile) {
        if (isVisited(currentTile)) return false;
        if (isWin(currentTile)) {
          return true;
        }

        visitNode(currentTile);

        const childNodes = generateNodes(currentTile);
        for (let i = 0; i < childNodes.length; ++i) {
          const childTile = childNodes[i];
          // childParentPairs = {
          //   ...childParentPairs,
          //   [childTile]: currentTile
          // };
          if (algorithms.depthFirstSearch(childTile)) return true;
        }
      },
      breadthFirstSearch(currentTile) {
        if (isVisited(currentTile)) return false;
        if (isWin(currentTile)) {
          return true;
        }
        visitNode(currentTile);
        let indexCurrent = 0;

        while (visited[indexCurrent] !== undefined) {
          let parentTile = visited[indexCurrent];
          indexCurrent++;
          if (isWin(parentTile)) {
            searched = [...visited];
            visited = [];
            while (childParentPairs[parentTile] !== startTile) {
              parentTile = childParentPairs[parentTile];
              visited.push(parentTile);
            }
            visited.push(startTile);
            return true;
          }
          const childNodes = generateNodes(parentTile);
          childNodes.forEach(childTile => {
            if (isVisited(childTile) === false) {
              //TODO fix no-loop-func
              childParentPairs = {
                ...childParentPairs,
                [childTile]: parentTile
              };
              visitNode(childTile);
            }
          });
        }
      },
      dijkstra(currentTile) {
        const isNotVisitedOrIsCloser = (childTile, parentTile) => {
          return (
            childParentPairs[childTile] === undefined ||
            childParentPairs[childTile].distance >
              childParentPairs[parentTile].distance + 1
          );
        };
        visitNode(currentTile);
        let indexCurrent = 0;
        childParentPairs = { [currentTile]: { distance: 1 } };

        while (visited[indexCurrent] !== undefined) {
          let parentTile = visited[indexCurrent];
          indexCurrent++;

          const childNodes = generateNodes(parentTile);
          childNodes.forEach(childTile => {
            if (isNotVisitedOrIsCloser(childTile, parentTile) === true) {
              childParentPairs = {
                ...childParentPairs,
                [childTile]: {
                  distance: childParentPairs[parentTile].distance + 1,
                  parent: parentTile
                }
              };
              visitNode(childTile);
            }
          });
        }
        searched = [...visited];
        visited = [];
        let parentTile = sideLength * (sideLength - 1) - 2;
        while (childParentPairs[parentTile] !== undefined) {
          visited.push(parentTile);
          parentTile = childParentPairs[parentTile].parent;
        }
        visited.push(startTile);
      }
    };

    if (isWall(startTile)) return;

    algorithms[options.algorithm](startTile);
    this.setState({ visited: visited, searched: searched });
  };

  clearVisited = () => {
    this.setState({ visited: [] });
  };

  clearSearched = () => {
    this.setState({ searched: [] });
  };

  clearWalls = () => {
    this.setState({ wallTiles: [] });
  };

  changeAlgorithm = event => {
    this.clearVisited();
    this.clearSearched();
    this.setState({ options: { algorithm: event.target.value } });
  };

  render() {
    return (
      <div className="Board">
        <Sidenav
          handleRun={() =>
            this.runAlgorithm(parseInt(this.props.sideLength) + 1)
          }
          handleClearPath={() => {
            this.clearVisited();
            this.clearSearched();
          }}
          handleClearWalls={this.clearWalls}
          handleAlgorithmChange={this.changeAlgorithm}
        />
        <Map
          sideLength={this.props.sideLength}
          handleDraw={this.handleDraw}
          wallTiles={this.state.wallTiles}
          visitedTiles={this.state.visited}
          searchedTiles={this.state.searched}
        />
      </div>
    );
  }
}

export default Board;
