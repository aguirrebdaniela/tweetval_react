import React, {Component} from 'react';
import axios from 'axios';
import { Route, Redirect, Switch, Router } from "react-router-dom";
import { Link } from "react-router-dom";
import $ from 'jquery'; 
import ReactQueryParams from 'react-query-params'
const ReactHighcharts = require('react-highcharts'); 

class Term extends Component {
  constructor(props) {
    super(props)

    this.state = {
      result: props.result,
      termAndResults : new Array(),
      url: 'http://localhost:8080',
      highChartsConfig: {},
      word: ''
    }
     this.backToSearch=this.backToSearch.bind(this)

  }
   backToSearch(event){
    event.preventDefault();
    this.setState({
      mode: 'search'
    });
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

   componentDidMount() {
   	var word = (this.props.location.search).replace("?word=","") 
   	this.state.word = word;
   	console.log(this.state)
   	this.searchTermsAndResult(this.state.word)
  }

  componentDidUpdate() {
		let chart = this.refs.chart.getChart();
		chart.reflow = () => {};
	}


  searchTermsAndResult(text) {  
    this.state.termAndResults.terms = new Array();
    axios.get(`${this.state.url}/terms/word/`+text)
      .then(res => { 
        var deferredArray = new Array();
        this.state.termAndResults.terms = res.data.terms;
        this.state.termAndResults.terms.forEach(element => {
          deferredArray.push(
            axios.get(`${this.state.url}/terms/results/`+element.id)
            .then(res => {
              element.results = res.data.result;
            })
          )
        });
        $.when.apply($, deferredArray).then( function () { 
    

          this.setState(function () { 
            return {


              highChartsConfig :  {
                chart: {
                    type: 'column',
                    
                },
                title: {
                    text: 'Results for "' + this.state.word +'"'
                },

                colors: ['#387038', '#f9f0eb', '#bd888f'],



                xAxis: {
                    categories: this.state.termAndResults.terms.map(a => a.id  + " - " + this.convertDateformat(a.search_date)  ),
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Evaluations'
                    }
                },
                tooltip: {
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
            					animation: {
                			duration: 2000
            }
        }
                },
                series: [{
                    name: 'Positive',
                    data: this.state.termAndResults.terms.map(a => a.results.filter(function (result) { if(result.evaluation.toLowerCase() == "positive") return result}).length)
            
                }, {
                    name: 'Neutral',
                    data: this.state.termAndResults.terms.map(a => a.results.filter(function (result) { if(result.evaluation.toLowerCase() == "neutral") return result}).length)
            
                }, {
                    name: 'Negative',
                    data: this.state.termAndResults.terms.map(a => a.results.filter(function (result) { if(result.evaluation.toLowerCase() == "negative") return result}).length)            
                }]
            }
           
           }
         });
         
          ///
          
       }.bind(this)
        );
      })
  }

render(){
	return(

      <div className="search-page">
     <div className="NavBar">
          <div className="nav-left">
             <div className="navbar-logo"> TWEETVAL </div>
          </div>

          <div className="nav-right">
              <Link to="/tweetval/search" className="navbar-item-right"> Search </Link> 
              <Link to="/tweetval/board" id="board" className="navbar-item-right"> My Board </Link>
              <p onClick={this.props.logout} className="navbar-item-right" >Logout</p>
          </div>
        </div>

		<div className="chart">
			 <ReactHighcharts config={this.state.highChartsConfig} ref="chart"></ReactHighcharts>
		</div>

		</div>

		)
	}
}


 export default Term;