// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">ReadRack</h2>
      </div>
      <div className="navbar-right">
        {/* When NOT logged in */}
        {!isLoggedIn && (
          <>
            {currentPath !== '/login' && <Link to="/login">Login</Link>}
            {currentPath !== '/register' && <Link to="/register">Register</Link>}
          </>
        )}

        {/* When logged in */}
        {isLoggedIn && (
          <>
            {currentPath !== '/books' && <Link to="/books">Books</Link>}
            {role === 'ADMIN' && <Link to="/dashboard">Dashboard</Link>}
            {role === 'ADMIN' && <Link to="/users">Users</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
