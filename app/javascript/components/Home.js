import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

function createData(name, author, release_year, book_amount, available_book_count) {
  return { name, author, release_year, book_amount, available_book_count };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Home extends React.Component {
  render() {
    return(
      <div>
        Home component
        <List></List>
      </div>
    )
  }
}

function List(){
  const classes = useStyles();
  return(
  <TableContainer component={Paper}>
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
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.author}</TableCell>
            <TableCell align="right">{row.release_year}</TableCell>
            <TableCell align="right">{row.book_amount}</TableCell>
            <TableCell align="right">{row.available_book_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
}


export default Home
