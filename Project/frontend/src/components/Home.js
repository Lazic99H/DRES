import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import React, {useState, useEffect} from "react";
import ActionPanel from './HomePanels/ActionPanel'
import BalancePanel from './HomePanels/BalancePanel'
import TablePanel from './HomePanels/TablePanel'
import ConvertPanel from './HomePanels/ConvertPanel'
import axios from "axios";
import '../styling/Panels.css'

function Home () {
    let navigate = useNavigate()

    const[balance,setBalance] = useState(sessionStorage.getItem("balance"))
    const[wanted_amount,setWantedAmount] = useState(1)
    const[required_money,setRequiredMoney] = useState(1)
    const[currency,setCurrency] = useState('RSD')
    const[rates,setRates] = useState([]);

    const convertButton = () => {
        if(required_money > balance){
            alert("NOT ENOUGH MONEY")
        }
        else{
        }

    }

    function handleWantedAmountChange(wanted_amount) {
        setRequiredMoney(wanted_amount * rates['RSD'] / rates[currency])
        setWantedAmount(wanted_amount);
    }

    function handleCurrencyChange(currency) {
        setRequiredMoney(wanted_amount * rates['RSD'] / rates[currency])
        setCurrency(currency)
    }

    useEffect( () => {
        axios.get('http://data.fixer.io/api/latest?access_key=59191a8d4448a6556c2c689f0cf3e2cb')
        .then(response => {
            setRates(response.data.rates);
        })
    },[]);

    return (
    <div className="panels">
      <div className="panel-action">
        <ActionPanel />
      </div>
      <div className="panel-balance">
        <BalancePanel />
      </div>
      <div className="panel-converter">
        <h1> Converter </h1>
        <ConvertPanel
            currencies={Object.keys(rates)}
            wanted_amount={wanted_amount}
            currency={currency}
            onAmountChange={handleWantedAmountChange}
            onCurrencyChange={handleCurrencyChange}
        />
        <ConvertPanel
            currencies={['RSD']}
            wanted_amount={required_money}
            currency={'RSD'}
        />

        <button onClick={convertButton} className="btn btn-success profile-button" >Convert Money</button>
      </div>
      <div className="panel-positions">
        <TablePanel/>
      </div>
</div>
    );
}

export default Home;