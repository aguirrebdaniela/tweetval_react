import React, {Component} from 'react';
import axios from 'axios';
import { Route, Redirect, Switch, Router } from "react-router-dom";
import { Link } from "react-router-dom";
import Term from './Term.js';
import $ from 'jquery'; 
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.


class Termtile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: props.result,
      parent: props.parent
     
    }
    console.log(this.state.parent)
    console.log(this.props)
    this.deleteTerm=this.deleteTerm.bind(this)
    this.convertDateformat=this.convertDateformat.bind(this)

  }

  componentDidMount() {
  	
}

  deleteTerm(event) {
  	var id= $(event.target).attr("data-id")
    
    // event.preventDefault();
     axios.delete(`http://localhost:8080/terms/results/${id}`)
    .then(response => {
		    	axios.delete(`http://localhost:8080/terms/${id}`)
		    .then(response => {
		      console.log(this.props);
		      this.props.handler(event);
		      // this.parent.state.mode= 'result'
		    })
		    .catch(err => {
		      console.log("Error with delete: ", err);
		    })
  	})
  }

  convertDateformat(stringDate){
    console.log(stringDate)
    var date = new Date(stringDate)
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
    
  }


  render() {
  	return(
  		<div className="tile">
  			<div > 
  			<p className='delete' value="Delete" onClick={this.deleteTerm} data-id={this.state.result.id} > delete </p>
  			</div>
  			<div className="tile-title">
  			{this.state.result.word} 
  			</div> 
  			<div className="tile-date">
  			{this.convertDateformat(this.state.result.search_date)}
  			</div>
  			<Link to={'./term/?word='+this.state.result.word }> Click </Link>

  			 
  		</div>

  		)
  }
}

 
 export default Termtile;
