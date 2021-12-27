import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

import "./App.css";

function App (props) {
    return (
      <Router basename="/">
        <div className="App">
          <div className="appAside" />
          <div className="appForm">
            <div className="pageSwitcher">
              <Link
                to="/sign-in"
                //activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign In
              </Link>
              <Link
                to="/"
                //activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Sign Up
              </Link>
            </div>

            <div className="formTitle">
              <Link
                to="/sign-in"
               // activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign In
              </Link>{" "}
              or{" "}
              <Link
                to="/"
                //activeClassName="formTitleLink-active"
                className="formTitleLink"
              >
                Sign Up
              </Link>
            </div>
            <Routes>
                <Route path="/" element={<SignUpForm/>} />
                <Route path="/sign-in" element={<SignInForm/>} />
            </Routes>
          </div>
        </div>
      </Router>
    );
}

export default App;
