import React, { Component } from "react";
import { render } from "react-dom";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Loginpage from "./Loginpage";
import Signuppage from "./Signuppage"
// import "./styles.css"

export default class App extends Component {
    constructor(props){
        super(props);
    }    
    render() {
        return(
            <div>
                
                {/* HELLO */}
                {/* <Navbar/> */}
                <Homepage/>
                {/* <Signuppage/> */}
                {/* <Loginpage/> */}
            </div>
        );
        //  return <p1>Hey </p1>
        //  return <Loginpage />;
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);



