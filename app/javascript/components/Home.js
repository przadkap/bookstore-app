import React, { useState, useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { sizing } from '@material-ui/system';

const useStyles = makeStyles({
  table: {
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
  },
});


class Home extends React.Component {
  render() {
    return(
      <div>
        <h1 align="center" >Welcome to BOOKSTORE </h1>
        <h2>Our offer </h2>
        <List></List>
      </div>
    )
  }
}

function List(){
  const classes = useStyles();
  const [books, setBooks] = useState([])

    useEffect(()=>{
      axios.get('/api/v1/books.json')
      .then( resp => {
        setBooks(resp.data.data)
      })
      .catch(resp => console.log(resp))
    }, [books.length])

  return(

  <TableContainer className={classes.table}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Book</TableCell>
          <TableCell align="right">Author</TableCell>
          <TableCell align="right">Release year</TableCell>
          <TableCell align="right">Amount</TableCell>
          <TableCell align="right">Currently available</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {books.map((item) => (
          <TableRow key={item.attributes.title}>
            <TableCell component="th" scope="row">
              {item.attributes.title}
            </TableCell>
            <TableCell align="right">{item.attributes.author}</TableCell>
            <TableCell align="right">{item.attributes.release_year}</TableCell>
            <TableCell align="right">{item.attributes.max_copies}</TableCell>
            <TableCell align="right">{item.attributes.available_copies}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}


export default Home
