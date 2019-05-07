import React from "react";
import "./App.css";
import Map from "./components/Map";
import Sidenav from "./components/Sidenav";

function App() {
  return (
    <div className="App">
      <Sidenav />
      <Map sideLength="25" />
    </div>
  );
}

export default App;
