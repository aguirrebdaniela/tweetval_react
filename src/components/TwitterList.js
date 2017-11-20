
import React, { Component } from 'react';
import '../css/App.css';
import Twit from 'twit';
import $ from 'jquery'; 
// import Language from '@google-cloud/language'


// class TwitterList extends Component {
//   constructor(props){
//     super(props);
//     // set up initial state
//     this.state = { // track inputs for form
      
//       }
//     }


function TwitterList(props) {



    return (
      <div className="results-page">

      <div className="results-text">
      Results for '{props.term}'
      </div>

      <div className="results-index">
        <p className="indexes" id="negative"> negative tweet </p> <p className="indexes" id="neutral"> neutral tweet </p> <p className="indexes" id="positive"> positive tweet </p> 
      </div>

      <div className="add-button">
       
      </div>


        <div className="results">
          {!props.repos
              ? <p>We were unable to find any results...</p>
              : 
              <div>
                  {props.repos.map(function (item, index) {  
                      return (
                          <div id="results" key={item.id} className={item.level ==  "Positive"? "alert alert-success" :  (item.level ==  "Negative" ? "alert alert-danger"  : "alert alert-warning")}>
                            {item.text}
                          </div>
                      )
                  })}
              </div>
          }
      </div>

    </div>
    )
  }


  export default TwitterList;

