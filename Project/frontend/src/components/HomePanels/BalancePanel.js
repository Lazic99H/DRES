import React from "react";
import "../../styling/BalancePanel.css"

function BalancePanel (){
  return(
  <div>
    <h1 className="balance" >Balance:</h1>
    <h2 className="balance" >{sessionStorage.getItem("balance")} {sessionStorage.getItem("currency")}</h2>
  </div>
  );
}
export default BalancePanel;