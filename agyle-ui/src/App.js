import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Result from './Result';





function App() {
    return (   
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/Result" component={Result} />   
            </Switch>
        </BrowserRouter>       
    );
 }
export default App;
