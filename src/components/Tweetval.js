import React, { Component } from 'react';
import { Route, Redirect, Switch, Router } from "react-router-dom";
import '../css/App.css';

import axios from 'axios';
import Cookies from '../helpers/Cookies';
import UserAuth from './UserAuth';
import Content from './Content';
import Search from './Search';
import Board from './Board';
import TwitterList from './TwitterList';
import Term from './Term';

class Tweetval extends Component {
  constructor(props){
    super(props);
    // set up our state.
    this.state = {
      user: false,
      url: 'http://localhost:8080',
      inputValue: '',
    }

    this.initUser = this.initUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteTerm = this.deleteTerm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderView = this.renderView.bind(this);
    
    
  }

  componentDidMount(){
    this.initUser();
  }

  initUser(){

    const token = Cookies.get('token');

    if(token && token !== ''){
      axios.get(`${this.state.url}/users/validate`, {
        params: {auth_token: token} })
        .then(res => { 
        
          this.setState({user: res.data}, () => {
            this.props.history.push(`/tweetval/`);
          });
        })
        .catch(err => { // if there is an error
          Cookies.set("token", "") // take away the cookie
          // change the state so that there is no user and render the auth
          this.setState({user: false}, () => {
            this.props.history.push(`/userauth/`);
          });
        })
    } else { 
      <Redirect to="/userauth" />;
    }
  }

  setUser(user){
    Cookies.set('token', user.token);
    this.setState({user: user}, () => {
      this.props.history.push(`/tweetval/`);
    });
  }

  logout(){
    Cookies.set('token', '');
    this.setState({user: false}, () => {
      this.props.history.push(`/userauth/`);
    });
  }


  deleteTerm(event, id) {
    event.preventDefault();
    axios.delete(`http://localhost:8080/terms/${id}`)
    .then(response => {
      console.log(this.props);
    })
    .catch(err => {
      console.log("Error with delete: ", err);
    })
  }

   onSubmit(event) {
    event.preventDefault();
    console.log(this.state.user);
    axios
      .post("http://localhost:8080/", 
        {params: {auth_token: this.state.user.token}})
      // .then(response => {this.functionHere()})
      
      .catch(err => {
        console.log("Error: ", err);
      });
  }


  renderView(){
    return (
      <Switch>
        <Route exact path="/" render={_ => 
          <Redirect to="/userauth" />
          }/>
        
        <Route exact path="/userauth" render={props => (
          <UserAuth 
          {...props} setUser={this.setUser} url={this.state.url} />
          )} />
       
        <Route path="/tweetval/search" render={props => (
            <Search {...props}
              logout={this.logout}
              user={this.state.user}
              onSubmit={this.onSubmit}
              />
          )} />
        <Route path="/tweetval/board" render={props => (
            <Board
              {...props}
              logout={this.logout}
              user={this.state.user}
              name={this.state.user.name}
              delete={this.deleteTerm}
            />

          )}
        />

         <Route path="/tweetval/term" render={props => (
            <Term
              {...props}
              logout={this.logout}
              user={this.state.user}
              name={this.state.user.name}
              delete={this.deleteTerm}
            />

          )}
        />

         <Route path="/tweetval" render={props => (
            <Search {...props}
              logout={this.logout}
              user={this.state.user}
              onSubmit={this.onSubmit}
              />
          )} />
 
          <Route path="/tweetval/results"
          render={props => (
            <TwitterList
              {...props} 
              logout={this.logout}
              user={this.state.user}
              name={this.state.user.name}
            />
          )}
        />
      </Switch>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderView() }
      </div>
    );
  }
}

export default Tweetval;
