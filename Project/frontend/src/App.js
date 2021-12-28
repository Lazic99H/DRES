import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";
import WrongURL from "./components/WrongURL";

import "./App.css";

const App = (props) => {

    return (
      <Router basename="/">
        <Routes>
            <Route>
                <Route path="/" element={<SignUpForm/>} />
                <Route path="/sign-in" element={<SignInForm />} />
            </Route>
            <Route path="/home" element={<Home/>} />
            <Route path="*" element={<WrongURL/>} />
        </Routes>
      </Router>
    );
};

export default App;
