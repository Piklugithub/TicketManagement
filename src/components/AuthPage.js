// src/components/AuthPage.js
import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './Auth.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? <Login /> : <Register />}
        <button className="toggle-btn" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register Yourself' : 'Back to Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
