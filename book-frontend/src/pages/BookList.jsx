import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get('/books');
      setBooks(res.data.data); // assuming response is { message: "...", data: [...] }
    } catch (err) {
      alert('Failed to fetch books. Please login again.');
      navigate('/login');
    }
  };

  const deleteBook = async (isbn) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/books/${isbn}`);
        alert('Book deleted successfully');
        fetchBooks();
      } catch (err) {
        alert('Failed to delete book');
      }
    }
  };

  return (
    <div>
      <h2>All Books</h2>
      <Link to="/add">➕ Add New Book</Link>
      <table border="1" cellPadding="10" style={{ marginTop: '10px' }}>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>ISBN</th><th>Year</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publicationYear}</td>
              <td>
                <button onClick={() => navigate(`/edit/${book.isbn}`)}>Edit</button>{' '}
                <button onClick={() => deleteBook(book.isbn)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
