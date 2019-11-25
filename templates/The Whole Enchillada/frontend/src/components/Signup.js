import React, {Component} from 'react';
import _ from '../services'


class Signup extends Component {

  handleInput = (e) => this.setState({[e.target.name]:e.target.value})
  
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }

  render() {
    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleInput} name="email" type="text"/>
          <input onChange={this.handleInput} name="password" type="password"/>
          <input type="submit" value="Sign UP"/>
        </form>
      </div>
    );
  }
}

export default Signup
