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

  runAlgorithm = () => {
    console.log(this.state);
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
          className="Board"
          style={{ maxWidth: `${sideLength * 25}px` }}
          onMouseDown={this.enableDrawing}
          onMouseUp={this.disableDrawing}
        >
          {this.createBoard()}
        </div>

        <button onClick={() => this.runAlgorithm()}>Run</button>
      </>
    );
  }
}

export default Board;
