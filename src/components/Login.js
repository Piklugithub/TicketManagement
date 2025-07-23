// src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('https://localhost:7289/api/Users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();

        // Expected `data` contains: fullName, profilePicture (base64), etc.
        const user = {
          fullName: data.fullName,
          profilePicture: data.profilePictureBase64, // base64 string from backend
        };

        localStorage.setItem('user', JSON.stringify(user));

        alert('Login successful');

        // Redirect to dashboard page
        navigate('/dashboard');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;