import React from "react";
import "./App.scss";

import Calendar from "./components/Calendar/Calendar";
import RightPanel from "./components/RightPanel/RightPanel";

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
        <div id="right-panel">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
