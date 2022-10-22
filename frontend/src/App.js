import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Quotes from "./GetAll.js";
import GetSingular from "./GetOne";
import Post from "./Post";
import Update from "./Update";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quotes />
        <GetSingular />
        <Post />
        <Update />
      </header>
    </div>
  );
}
export default App;
