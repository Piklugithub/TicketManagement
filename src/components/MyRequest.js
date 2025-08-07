import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTicketModal from './EditTicketModal';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const userDetails = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };
const MyRequestsPage = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [searchId, setSearchId] = useState("");
  const navigate = useNavigate();

  const fetchTickets = async (ticketId = "") => {
    try {
      const response = await axios.get("https://localhost:7289/api/tickets/my-requests", {
        params: {
          createdBy: userDetails.userId,
          searchTicketId: ticketId
        }
      });
      setTickets(response.data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };
  useEffect(() => {
    fetchTickets(); // fetch all on load
  }, []);

  const openEditPage = (ticketId) => {
    navigate(`/edit-ticket/${ticketId}`);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    fetchTickets(searchId); // search on form submit
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Ticket Requests</h3>

      <form className="row g-3 mb-4" onSubmit={handleSearch}>
        <div className="col-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Ticket ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Ticket ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Group</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket.ticketId}>
                <td>
                  <button className="btn btn-link p-0 text-decoration-none" onClick={() => openEditPage(ticket.ticketId)}>
                    #{ticket.ticketId}
                  </button>
                </td>
                <td>{ticket.title}</td>
                <td>{ticket.status}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.assigmentTo}</td>
                <td>{ticket.group}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No tickets found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequestsPage;
