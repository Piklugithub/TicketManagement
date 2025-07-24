import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // optional: add custom styles here
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TicketTable from './TicketTable';
import { faTicketAlt, faCheckCircle, faClock, faPauseCircle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [ticketStats, setTicketStats] = useState({
    active: 0,
    resolved: 0,
    onHold: 0,
    queued: 0
  });
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [ticketList, setTicketList] = useState([]);
  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };

    useEffect(() => {
    fetch('https://localhost:7289/api/Tickets/StatusCounts')
      .then(res => res.json())
      .then(result => {
        console.log("Fetched data:", result);
        setTicketStats({
          active: result.data.active,
          resolved: result.data.resolved,
          onHold: result.data.onHold,
          queued: result.data.queued
        });
      })
      .catch(err => {
        console.error('Failed to load ticket stats:', err);
        setTicketStats({ active: 5, resolved: 10, onHold: 2, queued: 1 });
      });
  }, []);
  const handleCardClick = (status) => {
    setSelectedStatus(status);
    fetch(`https://localhost:7289/api/Tickets/GetTicketsByStatus/${status}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTicketList(data.data);
        }
      });
  };

  return (
  <div className="dashboard-container">
    <h2>Welcome, {user.fullName}!</h2>
    <div className="dashboard-cards">
      <div className="card card-active" onClick={() => handleCardClick('Active')}>
        <FontAwesomeIcon icon={faTicketAlt} className="card-icon icon-blue" />
        <h3>Active Tickets</h3>
        <p>{ticketStats.active}</p>
      </div>
      <div className="card card-resolved" onClick={() => handleCardClick('Resolved')}>
        <FontAwesomeIcon icon={faCheckCircle} className="card-icon icon-green" />
        <h3>Resolved Tickets</h3>
        <p>{ticketStats.resolved}</p>
      </div>
      <div className="card card-onhold" onClick={() => handleCardClick('On Hold')}>
        <FontAwesomeIcon icon={faPauseCircle} className="card-icon icon-yellow" />
        <h3>On Hold Tickets</h3>
        <p>{ticketStats.onHold}</p>
      </div>
      <div className="card card-queued" onClick={() => handleCardClick('Queued')}>
        <FontAwesomeIcon icon={faClock} className="card-icon icon-gray" />
        <h3>Queued Tickets</h3>
        <p>{ticketStats.queued}</p>
      </div>
    </div>
    {selectedStatus && (
      <TicketTable tickets={ticketList} status={selectedStatus} />
    )}
  </div>
);
};

export default Dashboard;