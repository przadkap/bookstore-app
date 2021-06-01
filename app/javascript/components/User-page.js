import React, { useState, useEffect, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { sizing } from '@material-ui/system';

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


class UserPage extends React.Component {
  render() {
    return(
      <div>
      <Typography variant="h4" align="center" gutterBottom>
        Your books
      </Typography>

      </div>
    )
  }
}




export default withStyles(styles)(UserPage);
