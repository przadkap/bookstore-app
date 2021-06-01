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
import Button from '@material-ui/core/Button';
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

  constructor(props) {
    super(props);
    this.state = {
      book_id: [],
      user_id: {},
      books: [],
     };
  };

  componentDidMount() {
  this.getBooksID()
}

loadBooks = (bookId, userId) => {
  this.setState({
    book_id: bookId,
    user_id: userId,
  })
  this.getBooks()

};
    getBooksID= ()=>{
      axios.get('/api/v1/users/2')
      .then( resp => {
        //console.log("user info", resp)
        //console.log("user info", resp.data.data.id)
        this.loadBooks(resp.data.data.relationships.books.data, resp.data.data.id )
      })
      .catch(resp => console.log(resp))
    };

    getBooks=()=>{
      for(var i = 0; i < this.state.book_id.length; i++)
        axios.get('/api/v1/books/' + this.state.book_id[i].id)
        .then( resp => {
          //console.log("book info", resp.data)
          this.setState(state => ({
            books:[...state.books, resp.data]
          }))
        })
        .catch(resp => console.log(resp))
      };

  returnBook = (id) => {
    console.log("user_id",  this.state.user_id)
    console.log("book_id",  id)
    axios.post('/api/v1/op/return_book', {
      user_id: this.state.user_id,
      book_id: id,
    })
    .then( resp => {
      console.log("returned book", resp.data)
      this.getBooksID();
    })
    .catch(resp => console.log(resp))
  };


  render() {
    const { classes } = this.props;
    console.log("book info is ready", this.state.books)
    //console.log("book length is", this.state.books.length)

    return(
<div>
      <Typography variant="h4" align="center" gutterBottom>
        Your books
      </Typography>


      <TableContainer className={classes.table}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Book</TableCell>
          <TableCell align="right">Author</TableCell>
          <TableCell align="right">Release year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          this.state.books.length > 0  ?
          (this.state.books.map((item) => (
          <TableRow key={item.data.attributes.title}>
            <TableCell component="th" scope="row">
              {item.data.attributes.title}
            </TableCell>
            <TableCell align="right">{item.data.attributes.author}</TableCell>
            <TableCell align="right">{item.data.attributes.release_year}</TableCell>
            <TableCell align="center">
              <Button variant="contained" color="primary" onClick={() => this.returnBook(item.data.id)}>Return</Button>
            </TableCell>
          </TableRow>
        ))) : (<TableRow>
                <TableCell component="th" scope="row">- </TableCell>
                <TableCell align="right">-</TableCell>
                <TableCell align="right">-</TableCell>
              </TableRow>)
      }
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
  }
}




export default withStyles(styles)(UserPage);
