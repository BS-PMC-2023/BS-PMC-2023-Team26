import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import Homepage from "./Homepage";


export default class App extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return <Homepage />;
    }
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);

