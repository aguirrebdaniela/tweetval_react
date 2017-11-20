import React, { Component } from 'react';
import axios from 'axios';
import TwitterList from './TwitterList';
import { Route, Redirect, Switch, Router } from "react-router-dom";
import { Link } from "react-router-dom";
import $ from 'jquery'; 
import { RingLoader } from 'react-spinners';
import loading from './images/loading.gif';
import { CSSTransition, transit } from "react-css-transition";
  import AwesomeButton from 'react-awesome-button';
  import 'react-awesome-button/dist/styles.css';

class Search extends Component {
  constructor(props){
      super(props);
      this.state = {
        inputValue: '',
        url: 'http://localhost:8080',        
        results: [], 
        isloading: false,
        mode: 'search',
        active: false ,
      };
      this.handleChange = this.handleChange.bind(this);
      this.searchTweets= this.searchTweets.bind(this);
      // this.addTerm=this.addTerm.bind(this)
      this.searchTweet=this.searchTweet.bind(this)
      this.backToSearch=this.backToSearch.bind(this)
  }

  searchTweet(e){
    e.preventDefault(); // prevent default form action
    this.setState({  
      isloading: true
   });  
    this.state.isloading=true
    console.log(this.state)
    this.searchTweets(this.state.inputValue)
    .then(function (results) {  
      this.setState(function () {  
         return {
          results: results,
          isloading: false,
          mode: "results"
         } 
      })
    }.bind(this))
    
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      inputValue: event.target.value
    });
  }

  backToSearch(event){
    event.preventDefault();
    this.setState({
      mode: 'search'
    });
  }

  searchTweets(text) {  
    return   axios.get(`${this.state.url}/twitter/`+text)
      .then(res => { // set the user based off of the response
        console.log(res.data)
        return res.data;
      })
  }

  // addTerm(event) {
  //   event.preventDefault();
  //   var term = this.state.inputValue;
  //   var userId= this.props.user.id
  //   var date= new Date()
  //   axios
  //     .post("http://localhost:8080/terms/", 
  //       { word:term, search_date:date, user_id: userId })
  //     .then(response => { 
  //       var id_terms = response.data.term.id;
  //       console.log(id_terms)
  //       $(this.state.results).each(function() {
  //          var result  =  this;
  //          axios
  //         .post("http://localhost:8080/terms/results", 
  //           {tweet_text: result.text, 
  //             score: result.score, 
  //             magnitude: result.magnitude, 
  //             evaluation: result.level, 
  //             id_terms: id_terms})
  //         .then(response => { 
                          
              
  //         })
  //       })
  //     })
  //     .catch(err => {
  //       console.log("Error adding search term: ", err);
  //     });
  // }

  render(){

    const Actions = {progress: ( element, next) => {
    setTimeout(() => {
        
    var term = this.state.inputValue;
    var userId= this.props.user.id
    var date= new Date()
    axios
      .post("http://localhost:8080/terms/", 
        { word:term, search_date:date, user_id: userId })
      .then(response => { 
        var id_terms = response.data.term.id;
        console.log(id_terms)
        next()
        $(this.state.results).each(function() {
           var result  =  this;
           axios
          .post("http://localhost:8080/terms/results", 
            {tweet_text: result.text, 
              score: result.score, 
              magnitude: result.magnitude, 
              evaluation: result.level, 
              id_terms: id_terms})

        })
      })
    // next();
    }, 500);
  }
}

    var divStyle = {
    marginTop: 200,
    height: 200, 
    width: 250,
    marginLeft: 200,
    textAlign: 'center'
    };
    const { from } = this.props.location.state || '/'
    let content;

    const mode = this.state.mode;

      if (mode === "search") { 
         if(!this.state.isloading)  {
        content =

        <div className="search-form">
          <h2 className="search-title"> What is being tweeted about ...</h2>
          <form onSubmit={this.searchTweet.bind(this)} >
            
            <input className="search-bar" id='text' name='text' type='text' value={this.state.inputValue} onChange={this.handleChange} autoFocus/>
              <br></br>
            <button type="submit" className="search-button"> SEARCH
            </button>
  
          <div id="resultList">
          </div>
          </form>
          </div>

        }
        else
        { content= <img style={divStyle} src={loading}/>
          }
        }
         else if(mode === "results") {
         
            content = 
            <div>
            <AwesomeButton 
        progress
          size="medium"
          action={Actions.progress}
          loadingLabel="Adding term ..."
          successLabel="Saved!"
          errorLabel="Ops!"
          states={{
            default: {
              backgroundStyle: {
                backgroundColor: 'pink',
                minHeight: 60,
                alignItems: 'right',
                justifyContent: 'center',
                borderRadius: 30,
                float: 'right'
              }}
            }}
          >
         ADD TO BOARD 
        </AwesomeButton>

            <TwitterList

            repos={this.state.results} term={this.state.inputValue}/>
            
            </div>
          }
          
  //    }
      
    return(


      <div className="search-page">
        <div className="NavBar">
          <div className="nav-left">
             <div className="navbar-logo"> TWEETVAL </div>
          </div>

          <div className="nav-right">
              <Link to="/tweetval/search" onClick={this.backToSearch.bind(this)}id="search" className="navbar-item-right"> Search </Link> 
              <Link to="/tweetval/board"  className="navbar-item-right"> My Board </Link>
              <p onClick={this.props.logout} className="navbar-item-right" >Logout</p>
          </div>
        </div>


        <div>
          {content}
  
        </div>

        </div>
    )
  }
}

export default Search;