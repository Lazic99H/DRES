import React,{ useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServiceSignFrom from './APIServices/APIServiceSignFrom'

function SignUpForm (props) {
   let navigate = useNavigate()

   const [name,setName] = useState("");
   const [last_name,setLastName] = useState("");
   const [address,setAddress] = useState("");
   const [city,setCity] = useState("");
   const [country,setCountry] = useState("");
   const [phone,setPhone] = useState("");
   const [mail,setMail] = useState("");
   const [password,setPassword] = useState("");
   const [hasAgreed,setHasAgreed] = useState(false);



  const handleChange = event => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
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
    if(name === "hasAgreed")
        setHasAgreed(value)
  }

  const handleSubmit = e => {
    e.preventDefault();
    APIServiceSignFrom.SignIn({name, last_name, address, city, country, phone, mail, password})
    .then(resp => {
        if(resp.Error){
            alert('Email is already registered!')
        }
        else{
            navigate('/sign-in')
        }

    })
    console.log("The form was submitted with the following data:");
  }

    return (
     <div className="App">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <Link
                to="/sign-in"
                className="pageSwitcherItem"
              >
                Sign In
              </Link>
              <Link

                to="/"
                className="pageSwitcherItem"
              >
                Sign Up
              </Link>
            </div>

            <div className="formTitle">
              <Link
                to="/sign-in"
                className="formTitleLink"
              >
                Sign In
              </Link>{" "}
              or{" "}
              <Link

                to="/"
                className="formTitleLink"
              >
                Sign Up
              </Link>
            </div>



      <div className="formCenter">
        <form onSubmit={handleSubmit} className="formFields">
          <div className="formField">
            <label className="formFieldLabel" htmlFor="name">
              First Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="formFieldInput"
              placeholder="Enter your first name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              required
              className="formFieldInput"
              placeholder="Enter your last name"
              name="last_name"
              value={last_name}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              id="address"
              required
              className="formFieldInput"
              placeholder="Enter your address"
              name="address"
              value={address}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              required
              className="formFieldInput"
              placeholder="Enter your city"
              name="city"
              value={city}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="country">
              Country
            </label>
            <input
              type="text"
              id="country"
              required
              className="formFieldInput"
              placeholder="Enter your country"
              name="country"
              value={country}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="phone">
              Phone number
            </label>
            <input
              type="text"
              id="phone"
              required
              className="formFieldInput"
              placeholder="Enter your phone"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="mail">
              E-Mail Address
            </label>
            <input
              type="email"
              id="mail"
              required
              className="formFieldInput"
              placeholder="Enter your email"
              name="mail"
              value={mail}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="formFieldInput"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="formField">
            <label className="formFieldCheckboxLabel">
              <input
                className="formFieldCheckbox"
                type="checkbox"
                name="hasAgreed"
                value={hasAgreed}
                required
                onChange={handleChange}
              />{" "}
              I agree all statements in{" "}
              <a href="null" className="formFieldTermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="formField">
            <button className="formFieldButton" >Sign Up</button>{" "}
            <Link to="/sign-in" className="formFieldLink">
              I'm already member
            </Link>
          </div>
        </form>
      </div>




      </div>
      </div>
    );
}
export default SignUpForm;