import React, {useEffect, useState} from "react";
import "../../styling/BalancePanel.css"
import APIServiceUpdateBalance from "../APIServices/APIServiceUpdateBalance"

function BalancePanel (){

  const [userID,setUserID] = useState(sessionStorage.getItem("account_id"))
  const [balance,setBalance] = useState(sessionStorage.getItem("balance"))
  const [balanceID,setBalanceID] = useState(sessionStorage.getItem("balance_id"))
  const [history,setHistory] = useState([])
  const [other_balances,setOtherBalances] = useState ([])

  useEffect( () => {
        APIServiceUpdateBalance.UpdateBalances(userID)
            .then(resp => {
                setOtherBalances(resp.other_balances)
            })

        APIServiceUpdateBalance.UpdateBalance(balanceID)
            .then(resp => {
                Object.entries(resp.user_balance[0])
                    .map( ([key, value]) => sessionStorage.setItem(`${key}`,value))
                setBalance(sessionStorage.getItem("balance"))
           })
            .catch(error => console.log(error))
    },[])

  return(
  <div>
    <div className="card p-3">
        <p className="text-dark">Business Account</p>
        <div className="card-bottom pt-3 px-3 mb-2">
            <div className="d-flex flex-row justify-content-between text-align-center">
                <div className="d-flex flex-column"><span>Balance amount</span>
                     <p>RSD <span className="text-white">{balance}</span></p>
                </div>
            </div>
        </div>
    </div>
    {
        other_balances.map(one_balance=>(
            <h3 key={one_balance["balance_id"]}> {one_balance["balance"]} {one_balance["currency"]} </h3>
        ))
    }
  </div>
  );
}
export default BalancePanel;