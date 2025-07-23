import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTachometerAlt, faTasks, faClipboardList, faPlusCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h4>Menu</h4>
      </div>
      <ul className="nav-links">
        <li><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</li>
        <li><FontAwesomeIcon icon={faTasks} /> Worklist</li>
        <li><FontAwesomeIcon icon={faClipboardList} /> My Requests</li>
        <li><FontAwesomeIcon icon={faPlusCircle} /> Raise Ticket</li>
      </ul>
      <div className="sidebar-footer">
        <li><FontAwesomeIcon icon={faCog} /> Settings</li>
        <li><FontAwesomeIcon icon={faSignOutAlt} /> Logout</li>
      </div>
    </div>
  );
};


export default Sidebar;
