import React from 'react';
import './ToastMessage.css';

const ToastMessage = ({ message, type = 'success', onClose }) => (
  <div className={`toast-message ${type}`}>
    <span>{message}</span>
    <button onClick={onClose} className="close-btn">&times;</button>
  </div>
);

export default ToastMessage;
