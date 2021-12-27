import React, {useState,useEffects } from "react";
import { Link } from "react-router-dom";
import APIServiceSignFrom from './APIServices/APIServiceSignFrom'

function SignInForm (props) {

      const [mail,setMail] = useState("");
      const [password,setPassword] = useState("");

      const logIn = () => {
          APIServiceSignFrom.SignIn({mail, password})
          .then(resp => console.log(resp))
          .catch(error => console.log(error))
      }

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

        console.log("The form was submitted with the following data:");
       // console.log(this.state);
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
                onClick ={logIn}
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