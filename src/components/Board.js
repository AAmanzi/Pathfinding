import React, { Component } from "react";
import Tile from "./Tile";
import Error from "./Error";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wallTiles: [],
      isDraw: false
    };
  }

  handleDraw = index => {
    this.setState(prevState => {
      let newTiles = [...prevState.wallTiles];
      newTiles.push(index);
      return {
        wallTiles: newTiles
      };
    });
  };

  enableDrawing = () => {
    this.setState({isDraw: true})
  };

  disableDrawing = () => {
    this.setState({isDraw: false})
  };

  createBoard = () => {
    const { sideLength } = this.props;
    const { isDraw } = this.state;
    const board = [];

    for (let i = 0; i < sideLength; ++i) {
      for (let j = 0; j < sideLength; ++j) {
        board.push(
          i === 0 || i === sideLength - 1 || j === 0 || j === sideLength - 1 ? (
            <Tile key={j + sideLength * i} isWall={true} />
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
              isWall={this.state.wallTiles.find(
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
      <div
        className="Board"
        style={{ maxWidth: `${sideLength * 25}px` }}
        onMouseDown={this.enableDrawing}
        onMouseUp={this.disableDrawing}
      >
        {this.createBoard()}
      </div>
    );
  }
}

export default Board;
