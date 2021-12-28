import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from "react-router-dom";

function Home () {
    const name = sessionStorage.getItem("name")
    const user = sessionStorage.getItem("logged_user")

    return (

      <div>
        HOME PAGE WELCOME {name}
      </div>
    );
}

export default Home;