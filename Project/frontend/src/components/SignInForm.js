import React, {useState,useEffects } from "react";
import { Link } from "react-router-dom";

function SignInForm (props) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

/*
  useEffects(() => {
    fetch('/api').then(response => {
        if(response.ok){
            return response.json()
        }
    }).then(data => console.log(data))
  },[])
*/
  const handleChange = event => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    if(name === 'email')
        setEmail(value)
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
            <label className="formFieldLabel" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              id="email"
              required
              className="formFieldInput"
              placeholder="Enter your email"
              name="email"
              value={email}
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
            <button className="formFieldButton">Sign In</button>{" "}
            <Link to="/" className="formFieldLink">
              Create an account
            </Link>
          </div>

        </form>
      </div>
    );
}

export default SignInForm;