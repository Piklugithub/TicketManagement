import React from 'react';
import './Header.css'; // external CSS for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from './images/TicketManage_Icon.png'; // import app icon

const Header = ({ toggleSidebar }) => {
  const user = JSON.parse(localStorage.getItem('user')) || {
    fullName: 'Guest',
    profilePicture: 'https://via.placeholder.com/40',
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* <button className="menu-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} />
        </button> */}
         <button id="toggleSidebar" className="btn btn-sm btn-outline-light me-3" onClick={toggleSidebar}>
           <FontAwesomeIcon icon={faBars} />
         </button>
        <img src={logo} alt="App Icon" className="app-icon" />
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
