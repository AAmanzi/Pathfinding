import React from "react";

const Tile = props => {
  return (
    <span
      className={"Tile " + (props.isWall ? "Wall" : "")}
      onMouseOver={props.mouseOver}
    />
  );
};

export default Tile;
