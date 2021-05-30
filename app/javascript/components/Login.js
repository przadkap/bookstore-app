import React, { useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {Link} from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      errors: ''
     };
  }
handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
      event.preventDefault()
      const {login, password} = this.state
      console.log( "login", login);
      /*let user = {
        login: login,
        password: password
      }*/

  axios.post('/api/v1/auth', {
    login: String(login),
    password: String(password)
  }, {withCredentials: true})
      .then(response => {
      //  console.log( "resp from login", response);
      console.log('i work', response)
      this.redirect()
            /*if (response.data.data.logged_in) {
              console.log('i work too')
              this.props.handleLogin(response.data)
              this.redirect()
            } else {
              this.setState({
                errors: response.data.errors
              })*/
            //}
          })
          .catch(error => console.log('api errors:', error))
        };

redirect = () => {
      //this.props.history.push('/')
      this.props.history.replace( '/' )
    }

  handleErrors = () => {
      return (
        <div>
          <ul>
          {this.state.errors.map(error => {
          return <li key={error}>{error}</li>
            })}
          </ul>
        </div>
      )
    };

render() {
    const {login,  password} = this.state
    return (
      <div>
        <h1>Log In</h1>
<form onSubmit={this.handleSubmit}>
          <input
            placeholder="login"
            type="text"
            name="login"
            value={login}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
<button placeholder="submit" type="submit">
            Log In
          </button>
         </form>
      </div>
    );
  }
}
export default Login;
