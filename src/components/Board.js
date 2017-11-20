import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import TermTile from './TermTile';

class Board extends Component {
  constructor(props){
    super(props);
    // set up initial state
    this.state = { 
      savedTerms: []
      }
    }

    componentDidMount() {
      axios
        .get('http://localhost:8080/terms/username/' + this.props.user.id)
        .then(function (response) {  
              this.setState( {  
                  savedTerms: response.data.terms
              })
              console.log(this.state.savedTerms)
            }.bind(this));
      }

   render(){
    return(
      <div className="board-page">
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

        <div className="board-title">
          <p> {this.props.user.name}'s board </p>
        </div>

        <div className="board-flex-container">
      {!this.state.savedTerms
              ? <p>Nothing to display</p>
              : 
              <div id="board-flex-container-id">
                {this.state.savedTerms.map(function (item, index) {  
                    return (
                        
                        <TermTile key={item.id} result={item}/> 

                      )
                  })}
              </div>
          }
          </div>


      </div>
      
    )
   }


  }


export default Board;