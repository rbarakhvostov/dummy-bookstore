import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookListItem from '../book-list-item';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';

import './book-list.css';

class BookList extends Component {

  componentDidMount() {
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    this.props.booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul>
        {
          books.map((book) => {
            return (
              <li key={book.id}>
                <BookListItem book={book} />
              </li>
            );
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = ({books}) => {
  return {books}
}

// 1.

// const mapDispatchToProps = (dispatch) => {
//   return {
//     booksLoaded: (newBooks) => {
//       dispatch(booksLoaded(newBooks));
//     }
//   }
// }

// 2.

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     booksLoaded
//   }, dispatch);
// }

//3.

const mapDispatchToProps = {
  booksLoaded
}

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
