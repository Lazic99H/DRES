import React, { useState } from "react";
import PropTypes from 'prop-types';
import "../../styling/ConvertPanel.css"
function ConvertPanel(props){

  return (
    <div className="group">
        <input type="number" value={props.wanted_amount} onChange={event => props.onAmountChange(event.target.value)}/>
        <select value={props.currency} onChange={event => props.onCurrencyChange(event.target.value) }>
            {props.currencies.map((currency => (
              <option key={currency} value={currency}>{currency}</option>
            )))}
        </select>
    </div>
  );
}

ConvertPanel.propTypes = {
    wanted_amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currencies: PropTypes.array,
    onAmountChange: PropTypes.func,
    onCurrencyChange: PropTypes.func,
}

export default ConvertPanel;