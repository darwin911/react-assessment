import React, { Component } from 'react';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      newBook: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch(`./BookList.JSON`)
      .then(res => res.json())
      .then(json =>
        this.setState(prevState => ({
          ...prevState,
          books: json.results.concat(prevState.books)
        }))
      );
  }

  handleAddBook(e) {
    e.preventDefault();

    const newBookObj = {
      title: this.state.newBook
    };
    this.setState(prevState => {
      return {
        ...prevState,
        books: [...prevState.books, newBookObj]
      };
    });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState(prevState => {
      return {
        ...prevState,
        newBook: value
      };
    });
  }

  handleDelete(index) {
    // alternate method

    // this.setState(prevState => ({
    //   ...prevState,
    //   books: prevState.books
    //     .slice(0, index)
    //     .concat(prevState.books.slice(index + 1))
    // }));

    this.setState(prevState => {
      prevState.books.splice(index, 1);
      return prevState;
    });
  }

  render() {
    console.log(this.state.newBook);
    const { books } = this.state;
    return (
      <div className='bookListMain'>
        <div className='header'>
          <form>
            <input placeholder='Book' onChange={e => this.handleChange(e)} />
            <button onClick={this.handleAddBook}>Add Book</button>
            <button onClick={this.handleSubmit}>
              Get Top 10 Books by Ken Follet
            </button>
          </form>
        </div>
        <ul>
          {books.map((book, idx) => (
            <>
              <li key={idx}>{book.title}</li>
              <button onClick={() => this.handleDelete(idx)}>X</button>
            </>
          ))}
        </ul>
      </div>
    );
  }
}
export default BookList;
