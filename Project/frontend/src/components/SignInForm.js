import React, {useState,useEffects } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServiceSignFrom from './APIServices/APIServiceSignFrom'

function SignInForm (props) {

      const [mail,setMail] = useState("");
      const [password,setPassword] = useState("");
      const logged_user = sessionStorage.getItem("logged_user");

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
            if(resp.status === 200) return resp.json();
            else alert("There has been some error with signing in")
        })
        .then(resp => {
             sessionStorage.setItem("logged_user",JSON.stringify(resp[1])),
             sessionStorage.setItem("token",JSON.stringify(resp[0])),
             props.redirectToHome(resp[1])})
        .catch(error => console.log(error))
        console.log("CONSOLE RADI")
        console.log(JSON.parse(logged_user))
        console.log("The form was submitted with the following data:");

      }

    return (
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
    );
}

export default SignInForm;