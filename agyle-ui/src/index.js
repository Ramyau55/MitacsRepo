import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import DisplayFeatures from './DisplayFeatures/displayFeatures';


const routing = (
  <Router>
    <div>      
      <hr />
      <Switch>
        <Route exact path="/" component={App} />       
      </Switch>      
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));



