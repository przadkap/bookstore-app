import React, { useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

//const useStyles = makeStyles({
const styles = theme => ({
  table: {
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
  },
  input: {
      width: '25ch',
      margin: 10,

  },
});


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

      axios.post('/api/v1/auth/log_in', {
        login: String(login),
        password: String(password)
      }, {withCredentials: true})
          .then(response => {
            console.log('login response', response)
            this.props.handleLogin(response.data)
          this.redirect()
          })
          .catch(error => console.log('api errors:', error))
        };

  redirect = () => {
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
    const { classes } = this.props;

    return (
      <div>
        <h1>Log In</h1>

<form  onSubmit={this.handleSubmit}>
          <div>
          <TextField className={classes.input} id="Login" label="Login"
            variant="outlined" placeholder="your login"
            type="text" name="login" value={login}
            onChange={this.handleChange}
          />
          </div>
          <div>
          <TextField className={classes.input} id="Password" label="Password" variant="outlined"
            placeholder="your password" type="password"
            name="password" value={password}
            onChange={this.handleChange}
          />
          </div>
          <div>
          <Button variant="contained" color="secondary" placeholder="submit" type="submit">
            Log in
          </Button>
          </div>
         </form>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
