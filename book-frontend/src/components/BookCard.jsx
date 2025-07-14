import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import './BookCard.css';

export default function BookCard({ book, onBookDeleted }) {
  const [editing, setEditing] = useState(false);
  const [editBook, setEditBook] = useState({
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    publicationYear: book.publication_year,
  });

  const handleDelete = async () => {
    const trimmedIsbn = book.isbn.trim();
    if (window.confirm(`Delete "${book.title}"?`)) {
      try {
        await axios.delete(`/books/${trimmedIsbn}`);
        onBookDeleted();
      } catch (error) {
        console.error('Failed to delete book:', error);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditBook({ ...editBook, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const trimmedIsbn = book.isbn.trim();
    try {
      await axios.put(`/books/${trimmedIsbn}`, {
        ...editBook,
        publication_year: parseInt(editBook.publicationYear),
      });
      setEditing(false);
      onBookDeleted(); // refresh list
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="book-card">
      {editing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input name="title" value={editBook.title} onChange={handleEditChange} />
          <input name="author" value={editBook.author} onChange={handleEditChange} />
          <input name="publicationYear" value={editBook.publicationYear} onChange={handleEditChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <h3>{book.title}</h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Year:</strong> {book.publication_year}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
}
