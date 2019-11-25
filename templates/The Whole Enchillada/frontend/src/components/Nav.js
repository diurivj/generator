import React from 'react';
import {Link} from 'react-router-dom'
export default (props) => (
    <nav>
      {  props.user.email ? 
      <ul>       
        <li>{props.user.email}</li>
        <li><Link to="/">Home</Link></li>
        <li><Link to='/' onClick={props.logOut}>LogOut</Link></li>
      </ul>
      : 
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>
      } 
      <i>{props.error ? props.error.message : ''}</i>
    </nav>
)
