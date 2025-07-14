// src/pages/Favorites.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';
import BookCard from '../components/BookCard';

export default function Favorites() {
  const userId = localStorage.getItem('userId');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}/favorites`).then(res => {
      setFavorites(res.data);
    });
  }, [userId]);

  return (
    <div className="books-container">
      <h1>My Favorite Books</h1>
      <div className="book-grid">
        {favorites.map(book => (
          <BookCard key={book.isbn} book={book} />
        ))}
      </div>
    </div>
  );
}
