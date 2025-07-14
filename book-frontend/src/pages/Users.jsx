import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/users').then(res => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/api/users/${id}`);
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="users-container">
      <h2>👥 User Management</h2>
      <ul className="user-list">
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name} ({user.email})</span>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}