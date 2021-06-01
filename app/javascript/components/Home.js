import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { sizing } from '@material-ui/system';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  table: {
    width: "90%",
    marginRight: "5%",
    marginLeft: "5%",
  },
  title: {
     padding: 10,
  }
});


class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      books: []
     };
  };

  componentDidMount() {
  this.getBooks()
}


getBooks=()=>{
    axios.get('/api/v1/books')
    .then( resp => {
      //console.log("book info", resp.data)
      this.setState({
        books: resp.data.data,
      })
    })
    .catch(resp => console.log(resp))
  };

  handleBorrow=(id)=>{
      axios.post('/api/v1/op/lend_book', {
        user_id: this.props.loggedId,
        book_id: id,
      })
      .then( resp => {
        console.log("book id", id)
        console.log("logged user id", this.props.loggedId)
        this.setState({
          books: resp.data.data,
        })
      })
      .catch(resp => console.log(resp))
    };

  render() {
    const { classes } = this.props;
    console.log("logged user id", this.props.loggedId)
    console.log("book info", this.state.books)
    return(
      <div>
      <Typography variant="h4" align="center" gutterBottom>
        Welcome to BOOKSTORE
      </Typography>
      <Typography variant="h6" gutterBottom>
        Our offer
      </Typography>
      <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Book</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Release year</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Currently available</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.books.length > 0  ?
            (this.state.books.map((item) => (
            <TableRow key={item.attributes.title}>
              <TableCell component="th" scope="row">{item.attributes.title}</TableCell>
              <TableCell align="right">{item.attributes.author}</TableCell>
              <TableCell align="right">{item.attributes.release_year}</TableCell>
              <TableCell align="right">{item.attributes.max_copies}</TableCell>
              <TableCell align="right">{item.attributes.available_copies}</TableCell>
              <TableCell align="center">
                <Button variant="contained" color="primary" onClick = {() => this.handleBorrow(item.id)}> Borrow</Button>
              </TableCell>
            </TableRow>
          )))
          : (<TableRow>
                  <TableCell component="th" scope="row">- </TableCell>
                  <TableCell align="right">-</TableCell>
                  <TableCell align="right">-</TableCell>
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


export default withStyles(styles)(Home);
