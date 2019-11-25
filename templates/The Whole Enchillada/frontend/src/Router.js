import React, {Component} from 'react';
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import _ from './services'
import Nav from './components/Nav'
import Home from './components/Home';
import Signup from './components/Signup'
import Login  from './components/Login'
import NotFound from './components/404/NotFound.js';

class App extends Component {
  
  state = {
    user: {},
    error:{}
  }
  
  componentDidMount() {
     _.getUser()
      .then(res => this.setState({user :  res.data.user }))
      .catch(error => this.setState({error: error.response.data.err}))
  }

  logOut = () => {
    console.log(this)
    _.logOut()
      .then(res  => this.setState({user : {}}))
      .catch(error => { 
        console.log(error.response)
        this.setState({error: error.response.data.err})
      })
  }

  logIn  = (user) => {
    _.login(user)
      .then(res  => this.setState({user:res.data.user}))
      .catch(error => this.setState({error: error.response.data.err}))
  }

  signUp = (user) => {
    _.signup(user)
      .then(res  => this.setState({user:res.data.user}))      
      .catch(error => this.setState({error: error.response.data.err}))
  }


  render() {
    return (
      <BrowserRouter>
        <Nav 
          user   = {this.state.user}
          error  = {this.state.error}
          logOut = {this.logOut}
        /> 
        <Switch> 
          <Route exact path="/"       component={(props) => <Home   {...props} />  } />
          <Route exact path="/login"  component={(props) => <Login  {...props} logIn={this.logIn} /> } />
          <Route exact path="/signup" component={(props) => <Signup {...props} signUp={this.signUp} /> } />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
};

export default App;
