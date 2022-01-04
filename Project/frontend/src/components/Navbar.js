import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import Profile from './Profile'

const Navbar= () =>{
  let navigate = useNavigate()

  const logOut = () => {
     sessionStorage.clear();
     navigate('/')
  }

  const logIn = () => {
     navigate('/sign-in')
  }
  return (
      <div>
        <title>Bootstrap Example</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
      <nav className="navbar navbar-inverse">

          <div className="navbar-header">
            <Link className="navbar-brand" to="/welcome-page">Crypto Zimeri</Link>
          </div>
          {sessionStorage.getItem("account_id") ?
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/home">Home</Link></li>
            <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="#">Page 1-1</a></li>
                <li><a href="#">Page 1-2</a></li>
                <li><a href="#">Page 1-3</a></li>
              </ul>
            </li>
            <li><a href="#">Page 2</a></li>
          </ul>
          : ""}
          {sessionStorage.getItem("account_id") ?

          <ul className="nav navbar-nav navbar-right">
            <li><a href="/profile"><span className="glyphicon glyphicon-user" /> Profile</a></li>
            <li onClick={logOut}><Link to="/" ><span className="glyphicon glyphicon-log-out"/> Logout</Link></li>
          </ul>
          :
           <ul className="nav navbar-nav navbar-right">
            <li onClick={logIn}><Link to="/sign-in" ><span className="glyphicon glyphicon-log-in"/> Login</Link></li>
          </ul>
          }

      </nav>

    </div>

  );
}
export default Navbar;