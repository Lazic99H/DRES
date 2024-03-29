import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import WrongURL from "./components/WrongURL";
import Profile from "./components/Profile";
import WelcomePage from "./components/WelcomePage";
import WrapCard from "./components/Transactions/WrapCard";
import WrapDepositCard from "./components/Transactions/WrapDepositCard";
import WrapTransferCard from "./components/Transactions/WrapTransferCard";


import "./App.css";
const App = (props) => {

    return (
      <Router basename="/">
      <Navbar/>
        <Routes>
            <Route>
                <Route path="/welcome-page" element={<WelcomePage/>}/>
            </Route>
            <Route>
                <Route path="/" element={<SignUpForm/>} />
                <Route path="/sign-in" element={<SignInForm />} />
            </Route>
            <Route>
                <Route path="/home" element={ <Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/profile/verify" element={<WrapCard/>}/>
                <Route path="/profile/deposit" element={<WrapDepositCard/>}/>
                <Route path="/profile/transfer" element={<WrapTransferCard/>}/>
            </Route>
            <Route path="*" element={<WrongURL/>} />
        </Routes>
      </Router>
    );
};

export default App;
