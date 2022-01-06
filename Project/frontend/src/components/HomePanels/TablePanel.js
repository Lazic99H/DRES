import React, {useState, useEffect} from "react";
import APIServiceUpdateTable from '../APIServices/APIServiceUpdateTable'


function TablePanel () {

    const [history,setHistory] = useState([])

    useEffect( () => {
        APIServiceUpdateTable.UpdateTable(sessionStorage.getItem("account_id")).then(resp => {
            console.log(resp.user_transactions)
            setHistory(resp.user_transactions[0])
        })
    },[])


    return (
      <div>
        {history && history!=undefined && history != []?
         history.amount
         :
         " "
         }
      </div>
    );
}

export default TablePanel;