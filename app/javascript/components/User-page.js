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
      user_id: this.props.loggedId,
      books: [],
     };
  };

  componentDidMount() {
  this.loginStatus()
}

loadBooks = (bookId) => {
  this.setState({
    book_id: bookId,
  })
  this.getBooks()

};

loginStatus = () => {
  axios.get('/api/v1/auth/status',
 {withCredentials: true})
.then(response => {
      if (response.data.logged_in) {
      this.setState({
        user_id: response.data.id,
      });
      //console.log("assign user id", response.data.id)
      this.getBooksID(response.data.id);
    }
  })
  .catch(error => console.log('api errors:', error))
};

    getBooksID= (user_id)=>{
      axios.get('/api/v1/users/'+ user_id)
      .then( resp => {
        console.log("book id", resp.data.data.relationships.books.data)
        this.loadBooks(resp.data.data.relationships.books.data)
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
      this.loginStatus();
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
