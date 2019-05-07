import React, { Component } from "react";
import Tile from "./Tile";
import Error from "./Error";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallTiles: [],
      isDraw: false,
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

  enableDrawing = () => {
    this.setState({ isDraw: true });
  };

  disableDrawing = () => {
    this.setState({ isDraw: false });
  };

  runAlgorithm = startTile => {
    let { sideLength } = this.props;
    let { visited } = this.state;

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
      return (
        this.state.wallTiles.find(wallTile => wallTile === tile) !== undefined
      );
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

  createBoard = () => {
    const { sideLength } = this.props;
    const { isDraw } = this.state;
    const board = [];

    for (let i = 0; i < sideLength; ++i) {
      for (let j = 0; j < sideLength; ++j) {
        board.push(
          i === 0 || i === sideLength - 1 || j === 0 || j === sideLength - 1 ? (
            <Tile
              key={j + sideLength * i}
              isWall={
                (i !== 0 || j !== 1) &&
                (i !== sideLength - 1 || j !== sideLength - 2)
              }
              isStart={i === 0 && j === 1}
              isEnd={i === sideLength - 1 && j === sideLength - 2}
            />
          ) : (
            <Tile
              key={j + sideLength * i}
              mouseOver={
                isDraw
                  ? () => this.handleDraw(j + sideLength * i)
                  : () => {
                      return undefined;
                    }
              }
              mouseClick={() => this.handleDraw(j + sideLength * i)}
              isWall={this.state.wallTiles.find(
                tile => tile === j + sideLength * i
              )}
              isPath={this.state.visited.find(
                tile => tile === j + sideLength * i
              )}
            />
          )
        );
      }
    }
    return board;
  };

  render() {
    const { sideLength } = this.props;
    if (sideLength > 35) return <Error error="Maximum board size is 35!" />;
    return (
      <>
        <div
          className="Map"
          style={{ maxWidth: `${sideLength * 25}px` }}
          onMouseDown={this.enableDrawing}
          onMouseUp={this.disableDrawing}
        >
          {this.createBoard()}
        </div>

        <button onClick={() => this.runAlgorithm(parseInt(sideLength) + 1)}>
          Run
        </button>
        <button onClick={() => this.setState({ visited: [] })}>Clear</button>
      </>
    );
  }
}

export default Map;
