import * as React from 'react';
import * as ReactDOM from "react-dom";
import Routes from "../src/routes/route";
import "./styles.css";
import "../src/assets/custom.css"


import App from './App';


var mountNode = document.getElementById("app");
ReactDOM.render(<Routes />, mountNode);
