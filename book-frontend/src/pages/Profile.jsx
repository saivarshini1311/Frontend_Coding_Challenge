import React, { useEffect, useState } from 'react';
import './Profile.css';
import axios from '../utils/axiosInstance';

export default function Profile() {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({ name: '', email: '' });
  const [password, setPassword] = useState('');

  useEffect(() => {
    axios.get(`/users/${userId}`)
      .then((res) => {
        setUser(res.data.data); // ✅ fix structure
      })
      .catch((err) => {
        console.error('Failed to fetch user:', err);
      });
  }, [userId]);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${userId}`, user);
      alert('✅ Profile updated');
    } catch {
      alert('❌ Update failed');
    }
  };

  const changePassword = async () => {
    try {
      await axios.put(`/users/${userId}/password`, { password });
      alert('✅ Password changed');
      setPassword('');
    } catch {
      alert('❌ Password update failed');
    }
  };

  return (
    <div className="profile">
      <h2>👤 My Profile</h2>
      <form onSubmit={updateProfile} className="profile-form">
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <button type="submit">Update Profile</button>
      </form>

      <div className="password-change">
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={changePassword}>Change Password</button>
      </div>
    </div>
  );
}
