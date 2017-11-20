import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Tweetval from './components/Tweetval';
import "./css/App.css";

class App extends Component  {
  render() {
    return (
      <BrowserRouter>
        <Route
        path='/'
        render={props=>(
        	<Tweetval {...props}/>
        	)}
        />
      </BrowserRouter>
    );
  }
}

export default App;