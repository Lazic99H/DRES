import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../images/verified_logo.png'

function ActionPanel () {
    let navigate = useNavigate()

    const verifyButton = () => {
        navigate('/profile/verify')
    }
    const depositButton = () => {
        navigate('/profile/deposit')
    }
    return (
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
            <div className="font-weight-bold">{sessionStorage.getItem("name")}</div>
            <div className="text-black-50">{sessionStorage.getItem("mail")}</div>
            <br></br>
            {sessionStorage.getItem('verification') == 'false' ?
            <div className="mt-5 text-center">
                <button onClick={verifyButton} className="btn btn-primary profile-button" >Verify account</button>

            </div>
            :
            <div className="mt-5 text-center">
                 <img className="rounded-circle mt-5" width="50px" src={logo}/>
                  <div> <p> </p> </div>
                <button onClick={depositButton} className="btn btn-success profile-button" >Deposit money</button>
                <div> <p> </p> </div>
                <button className="btn btn-success profile-button" >Transfer money</button>
            </div>
            }
        </div>
    );
}

export default ActionPanel;