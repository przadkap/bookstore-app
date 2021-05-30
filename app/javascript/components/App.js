import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './Home';
import Details from './Details';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  render() {
    return(
      <div>
      <MuiThemeProvider theme={theme}>
        <MyAppBar></MyAppBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/details" component={Details} />
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App
