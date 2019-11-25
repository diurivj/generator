import React, {Component} from 'react';
import _ from '../services'


class Login extends Component {

  handleInput = (e) => this.setState({[e.target.name]:e.target.value})
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.logIn(this.state)
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} name="email" type="text"/>
          <input onChange={this.handleInput} name="password" type="password"/>
          <input type="submit" value="Log In"/>
        </form>
      </div>
    );
  }
}

export default Login


