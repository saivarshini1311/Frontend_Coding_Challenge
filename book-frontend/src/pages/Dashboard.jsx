import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', isbn: '', year: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/books').then(res => setBooks(res.data));
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/books', newBook);
    const res = await axios.get('http://localhost:8080/api/books');
    setBooks(res.data);
    setNewBook({ title: '', author: '', isbn: '', year: '' });
  };

  const deleteBook = async (isbn) => {
    await axios.delete(`http://localhost:8080/api/books/${isbn}`);
    setBooks(books.filter(book => book.isbn !== isbn));
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      <form onSubmit={addBook} className="add-book-form">
        <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} required />
        <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} required />
        <input type="text" placeholder="ISBN" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} required />
        <input type="text" placeholder="Year" value={newBook.year} onChange={(e) => setNewBook({ ...newBook, year: e.target.value })} required />
        <button type="submit">Add Book</button>
      </form>

      <div className="admin-book-list">
        {books.map((book) => (
          <div key={book.isbn} className="admin-book">
            <h4>{book.title}</h4>
            <p>{book.author}</p>
            <button onClick={() => deleteBook(book.isbn)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}