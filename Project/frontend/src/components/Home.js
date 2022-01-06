import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import React from "react";
import ActionPanel from './HomePanels/ActionPanel'
import BalancePanel from './HomePanels/BalancePanel'
import '../styling/Panels.css'

function Home () {
    return (
    <div className="panels">
      <div className="panel-action">
        <ActionPanel />
      </div>
      <div className="panel-balance">
        <BalancePanel />
      </div>
      <div className="panel-performance">
        " "
      </div>
      <div className="panel-positions">
        " "
      </div>
</div>
    );
}

export default Home;