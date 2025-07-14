// src/pages/Books.jsx
import React, { useEffect, useState } from 'react';
import './Books.css';
import BookCard from '../components/BookCard';
import axios from '../utils/axiosInstance';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = () => {
    axios.get('/books')
      .then(res => {
        console.log(res.data);
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setError('Failed to load books.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-container">
      <h1>My Books</h1>
      <div className="book-grid">
        {books.map(book => (
          <BookCard
            key={book.isbn}
            book={book}
            onBookDeleted={fetchBooks}
          />
        ))}
      </div>
    </div>
  );
}
