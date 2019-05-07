import React, { Component } from "react";
import Tile from "./Tile";
import Error from "./Error";

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraw: false
    };
  }

  enableDrawing = () => {
    this.setState({ isDraw: true });
  };

  disableDrawing = () => {
    this.setState({ isDraw: false });
  };

  createBoard = () => {
    const { sideLength, visitedTiles, wallTiles } = this.props;
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
                  ? () => this.props.handleDraw(j + sideLength * i)
                  : () => {
                      return undefined;
                    }
              }
              mouseClick={() => this.props.handleDraw(j + sideLength * i)}
              isWall={wallTiles.find(
                tile => tile === j + sideLength * i
              )}
              isPath={visitedTiles.find(
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
      </>
    );
  }
}

export default Map;
