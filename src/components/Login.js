import React, { Component } from 'react';
import axios from 'axios';
import '../css/App.css';
import TextLoop from 'react-text-loop';


// login component
// this will render when the user auth mode is set to login
class Login extends Component {
  constructor(){
    super();
    // set default state
    this.state = {
      // we have 2 inputs that we will be changing
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  // method to log in
  login(e){
    e.preventDefault(); // prevent default form action
    // send request to make sure the email and password are correct
    axios.post(`${this.props.url}/login`, this.state.inputs)
      .then(res => { // set the user based off of the response
        this.props.setUser(res.data);
      })
  }

  // method to change an input
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // sets the state for that input to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
      <div className="main-container-login">
        <div className="layer">

        <div className="flex-landing">
          <div className="tweetval-title-div">
            <p className="landing-title"> TWEETVAL </p>
            <p className="landing-subtitle">
               How is your&nbsp; 
               <TextLoop springConfig={{ stiffness: 180, damping: 8 }}>
                    <span className='rotating-text'> brand</span>
                    <span className='rotating-text'> name</span>
                    <span className='rotating-text'> company</span>
                </TextLoop> perceived?
            </p>
            <p className="landing-subtitle2">
            Through our app you can read what, is being<br></br>
             said about any text in real time. We use <br></br>  sentiment analysis to inspect the given text <br></br> identifying the prevailing emotional opinion <br></br> within the text,to determine a writer's attitude. 
            </p>
          </div>

          <div className="auth-form">
          <h2 className="title-form">Welcome Back!</h2>
          <form onSubmit={this.login.bind(this)}>

            <label htmlFor='email'></label>
            <input className='input-login' value={this.state.inputs.email}
              id='email' name='email' type='email' placeholder='email'
              onChange={e => this.changeInput(e, 'email')}
            />

            <label htmlFor='password'></label>
            <input className='input-login' value={this.state.inputs.password}
              id='password' placeholder='password' name='password' type='password'
              onChange={e => this.changeInput(e, 'password')}
            />

            <div className="form-buttons">
              <button type="submit" className="form-button">LOGIN</button>
              <p className="other-login1"> or click here to&nbsp;  
              <button className="other-login2" onClick={this.props.toggleMode}>Sign Up</button>
              </p>
            </div>
           </form>

        </div>
       </div>
      </div>
    </div>
    )
  }
}
export default Login;
