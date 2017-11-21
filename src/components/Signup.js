import React, { Component } from 'react';
import axios from 'axios';
import TextLoop from 'react-text-loop';

// component for sign up
// this will render if the mode in user auth is signup
class SignUp extends Component {
  constructor(){
    super();
    // set up initial state
    this.state = { // track inputs for form
      inputs: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }

  // method to sign up
  signUp(e){
    e.preventDefault(); // prevent default form action
    // make request to server to create a new user
    axios.post(`${this.props.url}/users`, this.state.inputs)
      .then(res => { // the response will be the user
        // set the user
        this.props.setUser(res.data);
      })
  }

  // method to change one of the inputs
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // set the input in the state to the value
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
          <h2 className="title-form">Join us to find out!</h2>
             <form onSubmit={this.signUp.bind(this)}>

          <label htmlFor='email'></label>
          <input className='input-login' value={this.state.inputs.name}
            placeholder='Name' id='name' name='name' type='text'
            onChange={e => this.changeInput(e, 'name')}
          />

          <label htmlFor='email'></label>
          <input className='input-login' value={this.state.inputs.email}
             placeholder='Email' id='email' name='email' type='email'
            onChange={e => this.changeInput(e, 'email')}
          />

          <label htmlFor='password'></label>
          <input className='input-login' value={this.state.inputs.password}
             placeholder='Password' id='password' name='password' type='password'
            onChange={e => this.changeInput(e, 'password')}
          />

          <label htmlFor='password_confirmation'></label>
          <input className='input-login' value={this.state.inputs.password_confirmation}
             placeholder='Password confirmation' id='password_confirmation'
            name='password_confirmation' type='password'
            onChange={e => this.changeInput(e, 'password_confirmation')}
          />

          <div className="form-buttons">
            <button type="submit" className="form-button">Sign Up</button>
            <p className="other-login1"> or click here to&nbsp; 
            <button onClick={this.props.toggleMode} className="other-login2">Log In</button>
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

export default SignUp;
