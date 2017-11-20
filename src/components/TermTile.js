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
     
    }
    console.log(this.state.result)
    this.deleteTerm=this.deleteTerm.bind(this)
  }

  componentDidMount() {

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

  render() {
  	return(
  		<div className="tile">
  			<div > 
  			<p onClick={this.deleteTerm.bind(this)}> delete </p>
  			</div>
  			<div className="tile-title">
  			{this.state.result.word} 
  			</div> 
  			<div className="tile-date">
  			{this.state.result.search_date.toLocaleString()}
  			</div>
  			<Link to={'./term/?word='+this.state.result.word }> Click </Link>

  			 
  		</div>

  		)
  }
}

 
 export default Termtile;
