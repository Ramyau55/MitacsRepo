import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/home.js';
import Login from './Login/login.js';
import Result from './Result/result.js';
import DisplayFeatures from './DisplayFeatures/displayFeatures';
import Header from "./Header/header.js";
import Footer from "./Footer/footer.js";
import './App.css';


function App() {
    return (         
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/Home" component={Home} /> 
                <Route exact path="/Result" component={Result} />    
                <Route exact path="/DisplayFeatures" component={DisplayFeatures} />               
            </Switch>
            <Footer />
        </BrowserRouter>       
    );
 }
export default App;
