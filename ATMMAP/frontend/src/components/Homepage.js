import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";



export default class Homepage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/"/>
                    <Route exact path="/register" Component={RegisterPage}/>
                    <Route exact path="/login" Component={LoginPage}/>
                </Routes>
            </BrowserRouter>
        );
    }
}


