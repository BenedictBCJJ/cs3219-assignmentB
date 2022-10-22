import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Quotes from "./GetAll.js";
import GetSingular from "./GetOne";
import Post from "./Post";
import Update from "./Update";
import Delete from "./Delete";
import AsianCurrency from "./AsianCurrency";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Quotes />
        <GetSingular />
        <Post />
        <Update />
        <Delete />
        <AsianCurrency />
      </header>
    </div>
  );
}
export default App;
