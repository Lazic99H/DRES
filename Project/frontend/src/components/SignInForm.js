import React, {useState,useEffects } from "react";
import { Link, useNavigate } from "react-router-dom";
import APIServiceSignFrom from './APIServices/APIServiceSignFrom'

function SignInForm (props) {
      let navigate = useNavigate()

      const [mail,setMail] = useState("");
      const [password,setPassword] = useState("");
      const [navToHome,setNavToHome] = useState(0);

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
          .then(resp => setNavToHome(resp.length))
          .then(resp => props.redirectToHome(resp))
          .catch(error => console.log(error))
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
                onClick ={() => (navToHome > 0 ?  navigate("/home") : navigate("/sign-in"))}
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