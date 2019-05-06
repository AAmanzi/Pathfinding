import React from "react";

const Tile = props => {
  return (
    <span
      className={
        "Tile " +
        (props.isWall
          ? "WallTile"
          : props.isStart
          ? "StartTile"
          : props.isEnd
          ? "EndTile"
          : props.isPath
          ? "PathTile"
          : "")
      }
      onMouseOver={props.mouseOver}
      onClick={props.mouseClick}
    />
  );
};

export default Tile;
