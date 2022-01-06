import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import React from "react";
import ActionPanel from './HomePanels/ActionPanel'
import BalancePanel from './HomePanels/BalancePanel'
import TablePanel from './HomePanels/TablePanel'
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
        Patrola iza zgrada coskovi rade slsuamo balade dodji u huddi malaaa lud
        JA sam hasal haslaa ee svetla laseri dizni LAND
      </div>
      <div className="panel-positions">
        <TablePanel/>
      </div>
</div>
    );
}

export default Home;