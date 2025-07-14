import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="content">
          <h1>Welcome to ReadRack</h1>
          <p>
            Manage your personal or organizational book collection easily with our system. 
            Add new books, update existing ones, and keep track of all your book data securely.
            Login to get started or register as a new user.
          </p>
        </div>
      </div>
    </div>
  );
}
