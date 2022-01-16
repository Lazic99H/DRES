import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styling/Profile.css";
import APIServiceProfileChange from './APIServices/APIServiceProfileChange'

function Profile () {
    let navigate = useNavigate()

    const [account_id,setAccountID] = useState(sessionStorage.getItem("account_id"))
    const [name,setName] = useState(sessionStorage.getItem("name"))
    const [last_name,setLastName] = useState(sessionStorage.getItem("last_name"))
    const [address,setAddress] = useState(sessionStorage.getItem("address"))
    const [city,setCity] = useState(sessionStorage.getItem("city"))
    const [country,setCountry] = useState(sessionStorage.getItem("country"))
    const [phone,setPhone] = useState(sessionStorage.getItem("phone"))
    const [mail,setMail] = useState(sessionStorage.getItem("mail"))
    const [password,setPassword] = useState(sessionStorage.getItem("password"))
    const [second_password,setSecondPassword] = useState(sessionStorage.getItem("password"))

    const handleSubmit = event => {
        event.preventDefault();
        if(password !== second_password){
            alert("Your passwords do not match")
        }
        else if(password.length < 8){
            alert("Minimum number of characters in password is 8")
        }else{
            APIServiceProfileChange.ChangeProfile(account_id,{name,last_name,address,city,country,phone,mail,password})
            .then(resp => {
                console.log(resp)
                if(resp.Error){
                    alert('Email is already registered!')
                }
                else{
                    alert('You updated your profile successfully!')
                    Object.entries(resp.user[0])
                    .map( ([key, value]) => sessionStorage.setItem(`${key}`,value))
                    navigate('/profile')
                    setName(sessionStorage.getItem("name"))
                    setLastName(sessionStorage.getItem("last_name"))
                    setAddress(sessionStorage.getItem("address"))
                    setCity(sessionStorage.getItem("city"))
                    setCountry(sessionStorage.getItem("country"))
                    setPhone(sessionStorage.getItem("phone"))
                    setMail(sessionStorage.getItem("mail"))
                    setPassword(sessionStorage.getItem("password"))
                    setSecondPassword(sessionStorage.getItem("password"))
                }

            })
        }
    }

    const verifyButton = () => {
        navigate('/profile/verify')
    }

    const handleChange = event => {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    if(name === "name")
        setName(value)
    if(name === "last_name")
        setLastName(value)
    if(name === "address")
        setAddress(value)
    if(name === "city")
        setCity(value)
    if(name === "country")
        setCountry(value)
    if(name === "phone")
        setPhone(value)
    if(name === 'mail')
        setMail(value)
    if(name === 'password')
        setPassword(value)
    if(name === "second_password")
        setSecondPassword(value)
  }


    return (
        <div className="container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>
                        <div className="font-weight-bold">{sessionStorage.getItem("name")}</div>
                        <div className="text-black-50">{sessionStorage.getItem("mail")}</div>
                        <br></br>
                        <div className="mt-5 text-center">
                                <button onClick={verifyButton} className="btn btn-primary profile-button" >Verify account</button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                       <form onSubmit={handleSubmit} className="formFields">
                            <div className="row mt-2">
                                <div className="col-md-6"><label className="labels">Name</label><input type="text" name="name" required className="form-control" placeholder="first name" value={name} onChange={handleChange}/></div>
                                <div className="col-md-6"><label className="labels">Last name</label><input type="text" name="last_name" required className="form-control" value={last_name} placeholder="last name" onChange={handleChange}/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="formField">  <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" name="phone" required className="form-control" placeholder="enter phone number" value={phone}  onChange={handleChange}/></div>  </div>
                                <div className="col-md-12"><label className="labels">Address</label><input type="text" name="address" required className="form-control" placeholder="address" value={address} onChange={handleChange}/></div>
                                <div className="col-md-12"><label className="labels">Email</label><input type="email" name="mail" required className="form-control" placeholder="email" value={mail} onChange={handleChange}/></div>
                                <div className="col-md-12"><label className="labels">Password</label><input type="password" name="password" required className="form-control" placeholder="password" value={password} onChange={handleChange}/></div>
                            <div className="col-md-12"><label className="labels">Confirm password</label><input type="password" name="second_password" required className="form-control" placeholder="confirm password" value={second_password} onChange={handleChange}/></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6"><label className="labels">Country</label><input type="text" name="country" required className="form-control" placeholder="country" value={country} onChange={handleChange}/></div>
                                <div className="col-md-6"><label className="labels">City/Region</label><input type="text" name="city" required className="form-control" value={city} placeholder="city" onChange={handleChange}/></div>
                            </div>
                            <br></br>
                            <div className="mt-5 text-center">
                                <button className="btn btn-primary profile-button" >Save profile</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>


        </div>



    );
}

export default Profile;