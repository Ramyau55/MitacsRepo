import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import DisplayFeatures from './DisplayFeatures/displayFeatures';
import Header from "./Header/header.js";

const routing = (
  <Router>     
      <Switch>
        <Route exact path="/" component={App} />       
      </Switch>      
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));



