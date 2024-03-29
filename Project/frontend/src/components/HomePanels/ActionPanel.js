import React from "react";
import { useNavigate } from "react-router-dom";
import { GoVerified } from 'react-icons/go';
import { GoUnverified } from 'react-icons/go';


function ActionPanel () {
    let navigate = useNavigate()

    const verifyButton = () => {
        navigate('/profile/verify')
    }
    const depositButton = () => {
        navigate('/profile/deposit')
    }
    const transferButton = () => {
        navigate('/profile/transfer')
    }
    return (
        <div className="d-flex flex-column align-items-center text-center p-3 py-5">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
            <div className="font-weight-bold" style={{color: 'black'}}>{sessionStorage.getItem("name")}</div>
            <div className="text-black-50" style={{color: 'black'}} >{sessionStorage.getItem("mail")} </div>
            <br></br>
            {sessionStorage.getItem('verification') == 'false' ?
            <div className="mt-5 text-center">
                <GoUnverified style={{background: 'white',color:'black', width:'25px', height:'25px'}}/>
                <p></p>
                <button onClick={verifyButton} style={{background: 'black', border: 'black'}} className="btn btn-primary profile-button" >Verify account</button>
            </div>
            :
            <div className="mt-5 text-center">
                 <GoVerified style={{background: 'white',color:'black', width:'25px', height:'25px'}}/>
                  <div> <p> </p> </div>
                <button onClick={depositButton} style={{background: 'black', border: 'black'}} className="btn btn-success profile-button" >Deposit money</button>
                <div> <p> </p> </div>
                <button onClick={transferButton} style={{background: 'black', border: 'black'}} className="btn btn-success profile-button" >Transfer money</button>
            </div>
            }
        </div>
    );
}

export default ActionPanel;