import React from 'react';
import {Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import UserPage from './User-page';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffdd71',
      main: '#ffab40',
      dark: '#c77c02',
      contrastText: '#000',
    },
    secondary: {
      light: '#6effff',
      main: '#00e5ff',
      dark: '#00b2cc',
      contrastText: '#000',
    },
  },
});

  const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  });

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
      id: {},
     };
  };

  componentDidMount() {
  this.loginStatus()
}

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.login,
      id: data.id
    })
  };
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  };

  handleClick = () => {
    axios.post('/api/v1/auth/log_out', {withCredentials: true})
    .then(response => {
      this.handleLogout()
      this.props.history.replace( '/' )
    })
    .catch(error => console.log(error))
  };

  loginStatus = () => {
    axios.get('/api/v1/auth/status',
   {withCredentials: true})
.then(response => {
    console.log("now it s logged", response);
      if (response.data.logged_in) {
        this.handleLogin(response.data)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  render() {
    console.log(" who is logged", this.state.id);
    const { classes } = this.props;
    return(
      <div>
      <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Bookstore
              </Typography>
              <div>
              {
                this.state.isLoggedIn ? (<div>
                  <Button variant="contained" color="secondary" component={Link} to={'/user-page'} >Your account</Button>
                  <Button variant="contained" color="primary" onClick={this.handleClick}>Logout</Button>
                </div>) :
                        (<Button variant="contained" color="primary" component={Link} to={'/Login'}>Login</Button> )
                }
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path='/' render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} loggedId={this.state.id}/>
              )}
          />
          <Route exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}  />
              )}
          />
          <Route exact path='/user-page' render={props => (
              <UserPage {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} loggedId={this.state.id}/>
              )}
          />
        </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
}


/*function MyAppBar(props) {
  const classes = useStyles();
  return (
  <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bookstore
          </Typography>
          <LoginButton></LoginButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}*/

/*function LoginButton(props) {
  const classes = useStyles();
  const isLoggedIn = this.props.isLoggedIn;
  console.log("is logged", isLoggedIn);
  return (
          <div>
          {
            isLoggedIn ? (<Button variant="contained" color="inherit">Logout</Button>) :
                    (<Button vvariant="contained" color="inherit" component={Link} to={'/Login'}>Login</Button> )
            }
          </div>
  );
}*/

export default withStyles(styles)(App);
