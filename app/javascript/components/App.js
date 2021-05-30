import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import axios from 'axios'

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

const useStyles = makeStyles({
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
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
      //console.log( "resp from login", response);
    })
    .catch(error => console.log('api errors:', error))
  };

  render() {
    return(
      <div>
      <MuiThemeProvider theme={theme}>
        <MyAppBar></MyAppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Login" component={Login} />
        </Switch>
        </MuiThemeProvider>
      </div>
    )
  }
}


function MyAppBar(props) {
  const classes = useStyles();
  return (
  <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6"  className={classes.title}>>
            Bookstore
          </Typography>
          <Link to='/Login' color="inherit">Login</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App
