import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Quotes from "./GetAll.js";
import GetSingular from "./GetOne";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quotes />
        <GetSingular />
      </header>
    </div>
  );
}
export default App;
