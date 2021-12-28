import React, {useState,useEffects } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServiceSignFrom from './APIServices/APIServiceSignFrom'

function SignInForm () {
      let navigate = useNavigate()

      const [mail,setMail] = useState("");
      const [password,setPassword] = useState("");

      const handleChange = event => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        if(name === 'mail')
            setMail(value)
        if(name === 'password')
            setPassword(value)
      }


      const handleSubmit = event => {
        event.preventDefault();
        APIServiceSignFrom.SignIn({mail, password})
        .then(resp => {
            console.log(resp)
            console.log(resp.length)
            if(resp.user){
                Object.entries(resp.user[0])
                .map( ([key, value]) => sessionStorage.setItem(`${key}`,value))
                sessionStorage.setItem("token",(resp.access_token))
                navigate("/home")
            }else{
                navigate('/sign-in')
                alert('Wrong email or password!')
            }

        })
        .catch(error => console.log(error))
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
        <form className="formFields" onSubmit={handleSubmit}>
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
            <button
                className="formFieldButton">
                Sign In
            </button>
            {" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

        </form>
      </div>

      </div>
      </div>
    );
}

export default SignInForm;