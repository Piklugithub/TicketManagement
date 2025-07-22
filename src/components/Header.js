import React from 'react';
import './Header.css'; // external CSS for styling

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    fullName: 'Guest',
    profilePicture: 'https://via.placeholder.com/40'
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/images/TicketManage_Icon.png" alt="App Icon" className="app-icon" />
      </div>

      <div className="header-center">
        <h2 className="app-title">Ticket Management System</h2>
      </div>

      <div className="header-right">
        <span className="user-name">{user.fullName}</span>
        <img src={user.profilePicture} alt="Profile" className="profile-pic" />
      </div>
    </header>
  );
};

export default Header;
