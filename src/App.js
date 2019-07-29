import React from "react";
import "./App.scss";

import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Stocks</h1>
      </header>
      <div className="Main">
        <div id="left-panel">
          <Calendar />
        </div>
        <div id="right-panel">{/* <h1>Right panel</h1> */}</div>
      </div>
      <div className="Modal">
        <h3>modal</h3>
      </div>
    </div>
  );
}

export default App;
