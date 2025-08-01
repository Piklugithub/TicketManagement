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
    open: 0
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
          open: result.data.open
        });
      })
      .catch(err => {
        console.error('Failed to load ticket stats:', err);
        setTicketStats({ active: 5, resolved: 10, onHold: 2, open: 1 });
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
  <div className="custom-dashboard-container">
  <h2 className="dashboard-heading">Welcome, {user.fullName}!</h2>
  <div className="custom-dashboard-cards">
    <div className="custom-card custom-card-active" onClick={() => handleCardClick('Active')}>
      <FontAwesomeIcon icon={faTicketAlt} className="custom-card-icon icon-blue" />
      <h3>Active Tickets</h3>
      <p>{ticketStats.active}</p>
    </div>

    <div className="custom-card custom-card-resolved" onClick={() => handleCardClick('Resolved')}>
      <FontAwesomeIcon icon={faCheckCircle} className="custom-card-icon icon-green" />
      <h3>Resolved Tickets</h3>
      <p>{ticketStats.resolved}</p>
    </div>

    <div className="custom-card custom-card-onhold" onClick={() => handleCardClick('On Hold')}>
      <FontAwesomeIcon icon={faPauseCircle} className="custom-card-icon icon-yellow" />
      <h3>On Hold Tickets</h3>
      <p>{ticketStats.onHold}</p>
    </div>

    <div className="custom-card custom-card-queued" onClick={() => handleCardClick('Open')}>
      <FontAwesomeIcon icon={faClock} className="custom-card-icon icon-gray" />
      <h3>Queued Tickets</h3>
      <p>{ticketStats.open}</p>
    </div>
  </div>

  {selectedStatus && (
    <TicketTable tickets={ticketList} status={selectedStatus} />
  )}
</div>
);
};

export default Dashboard;