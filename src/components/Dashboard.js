import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // optional: add custom styles here

const Dashboard = () => {
  const [ticketStats, setTicketStats] = useState({
    active: 0,
    resolved: 0,
    onHold: 0
  });

  const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };

  useEffect(() => {
    // Simulate fetch from backend API (replace this with real API call later)
    fetch('https://localhost:7289/api/Tickets/summary')
      .then(res => res.json())
      .then(data => setTicketStats(data))
      .catch(err => {
        console.error('Failed to load ticket stats:', err);
        // Optional: fallback dummy values
        setTicketStats({ active: 5, resolved: 10, onHold: 2 });
      });
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.fullName}!</h2>
      <div className="dashboard-cards">
        <div className="card card-active">
          <h3>Active Tickets</h3>
          <p>{ticketStats.active}</p>
        </div>
        <div className="card card-resolved">
          <h3>Resolved Tickets</h3>
          <p>{ticketStats.resolved}</p>
        </div>
        <div className="card card-onhold">
          <h3>On Hold Tickets</h3>
          <p>{ticketStats.onHold}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;