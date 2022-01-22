import React, {useEffect, useState} from "react";
import "../../styling/BalancePanel.css"
import APIServiceUpdateBalance from "../APIServices/APIServiceUpdateBalance"

function BalancePanel (){

  const [balance,setBalance] = useState(sessionStorage.getItem("balance"))
  const [history,setHistory] = useState([])

  useEffect( () => {
        APIServiceUpdateBalance.UpdateBalance(sessionStorage.getItem("balance_id"))
            .then(resp => {
                Object.entries(resp.user_balance[0])
                    .map( ([key, value]) => sessionStorage.setItem(`${key}`,value))
                setBalance(sessionStorage.getItem("balance"))
           })
            .catch(error => console.log(error))
    },[])

  return(
  <div>
    <h1 className="balance" >Balance</h1>
    <h2 className="balance" >{balance} {sessionStorage.getItem("currency")}</h2>
  </div>
  );
}
export default BalancePanel;