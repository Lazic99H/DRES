import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";

import "./App.css";

function App (props) {
    const [logged_user,setLogged_user] = useState([])


    const redirectToHome = (user) => {
    console.log(JSON.parse(sessionStorage.getItem("logged_user")))

    setLogged_user(JSON.parse(sessionStorage.getItem("logged_user")))

    console.log("SAD SAM OVDJE")
    console.log(logged_user.length)

    }

    return (
      <Router basename="/">
        <Routes>
            <Route exact path="/" element={<SignUpForm/>} />
            <Route path="/sign-in" element={<SignInForm redirectToHome={redirectToHome}/>} />
            <Route path="/home" element={<Home/>} />
        </Routes>
      </Router>
    );
}

export default App;
