import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TicketCommentSection from './TicketCommentSection';

const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };
const EditTicketPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    groupId: "",
    assignedTo: ""
  });

  useEffect(() => {
    fetchTicketDetails();
    fetchGroups();
  }, []);

  useEffect(() => {
    if (formData.groupId) {
      fetchGroupMembers(formData.groupId);
    }
  }, [formData.groupId]);

  const fetchTicketDetails = async () => {
    try {
      const res = await fetch(`https://localhost:7289/api/tickets/getticketById/${ticketId}`);
      const data = await res.json();
      setTicket(data);
      setFormData({
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        groupId: data.groupId,
        assignedTo: data.assignedTo
      });
    } catch (err) {
      console.error("Error fetching ticket:", err);
    }
  };

  const fetchGroups = async () => {
    const res = await fetch('https://localhost:7289/api/tickets/groups');
    const data = await res.json();
    setGroups(data);
  };

  const fetchGroupMembers = async (groupId) => {
    const res = await fetch(`https://localhost:7289/api/tickets/group-members/${formData.groupId}`);
    const data = await res.json();
    setMembers(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://localhost:7289/api/tickets/edit/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      alert("Ticket updated successfully!");
      navigate("/my-requests");
    } catch (err) {
      console.error("Error updating ticket:", err);
    }
  };

  if (!ticket) return <div className="text-center mt-5">Loading ticket...</div>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4">Edit Ticket #{ticketId}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Status</label>
            <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Priority</label>
            <select className="form-select" name="priority" value={formData.priority} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Assign Group</label>
            <select className="form-select" name="groupId" value={formData.groupId} onChange={handleChange} required>
              <option value="">-- Select Group --</option>
              {groups.map(g => (
                <option key={g.groupId} value={g.groupId}>{g.groupName}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3 mb-3">
            <label>Assign Member</label>
            <select className="form-select" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required>
              <option value="">-- Select Member --</option>
              {members.map(m => (
                <option key={m.memberId} value={m.memberId}>{m.memberName}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-success" onClick={handleSubmit}>Update Ticket</button>
      </form>
      <TicketCommentSection ticketId={ticketId} userId={user.userId} />
    </div>      
  );
};

export default EditTicketPage;
