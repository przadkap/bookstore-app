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
      user: {}
     };
  };

  componentDidMount() {
  this.loginStatus()
}

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  loginStatus = () => {
    axios.get('/api/v1/auth',
   {withCredentials: true})
.then(response => {
    console.log("now it s logged", response);
      if (response.data.logged_in) {
        //console.log("now it s logged", response);
        this.handleLogin(response)
      } else {
        console.log("now it s logged", response.data.logged_in);
        this.handleLogout()
      }
      //console.log( "resp from login", response);
    })
    .catch(error => console.log('api errors:', error))
  };

  render() {
    console.log("is logged", this.state.isLoggedIn);
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
                  <Button variant="contained" color="inherit" component={Link} to={'/user-page'} >Your account</Button>
                  <Button variant="contained" color="inherit">Logout</Button>
                </div>) :
                        (<Button vvariant="contained" color="inherit" component={Link} to={'/Login'}>Login</Button> )
                }
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <Switch>
          <Route exact path='/' render={props => (
              <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
              )}
          />
          <Route exact path='/login'
              render={props => (
              <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn} />
              )}
          />
          <Route exact path='/user-page' render={props => (
              <UserPage {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn}/>
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
