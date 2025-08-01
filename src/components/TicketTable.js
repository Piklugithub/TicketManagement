import React from 'react';
import './TicketTable.css'; // Optional: separate CSS file for styles

const TicketTable = ({ tickets, status }) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="ticket-table-section">
        <h4>{status} Tickets</h4>
        <p>No tickets available.</p>
      </div>
    );
  }

  return (
    <div className="ticket-table-section">
      <h4>{status} Tickets</h4>
      <div className="table-scroll-wrapper">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Assigned To</th>
            <th>Assigned Group</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.ticketId}>
              <td>{ticket.ticketId}</td>
              <td>{ticket.title}</td>
              <td className={`priority-cell ${ticket.priority.toLowerCase()}`}>{ticket.priority}</td>
              <td>{ticket.status}</td>
              <td>{ticket.createdBy}</td>
              <td>{ticket.assigmentTo}</td>
              <td>{ticket.group}</td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TicketTable;
