import React from 'react';
import Search from './Search';

// component that renders content
// this will render when there is a valid user
const Content = (props) => {
  return(
    <div className="content">
      <h2>Welcome, {props.user.name}</h2>
      < Search />
    
      <button onClick={props.logout}>Click here to log out!</button>
    </div>
  )
}

export default Content;
