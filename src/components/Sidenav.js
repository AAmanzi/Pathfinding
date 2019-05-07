import React from "react";

const Sidenav = props => {
  return (
    <nav className="Sidenav">
      <ul className="SidenavList">
        <li>
          <select>
            <option value="depthFirstSearch">Depth first search</option>
          </select>
        </li>
      </ul>
      <div className="SidenavButtons">
        <button className="Button" onClick={props.handleRun}>
          Run
        </button>
        <button className="Button" onClick={props.handleClearPath}>
          Clear path
        </button>
        <button className="Button" onClick={props.handleClearWalls}>
          Clear walls
        </button>
      </div>
    </nav>
  );
};

export default Sidenav;
