import React from "react";

function ActionPanel () {
    return (
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
            <div className="font-weight-bold">{sessionStorage.getItem("name")}</div>
            <div className="text-black-50">{sessionStorage.getItem("mail")}</div>
            <br></br>
            <div className="mt-5 text-center">
                <button className="btn btn-primary profile-button" >Verify account</button>
            </div>
            <br></br>
            {sessionStorage.getItem('verification') == 'false' ?
            <div className="mt-5 text-center">
                <button className="btn btn-success profile-button" >Deposit money</button>
                <div> <p> </p> </div>
                <button className="btn btn-success profile-button" >Transfer money</button>
            </div>
            :
            <div className="font-weight-bold">First you have to verify your account so that you could perform 'Deposits' and 'Transactions'</div>
            }
        </div>
    );
}

export default ActionPanel;