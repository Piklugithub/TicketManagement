import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const user = JSON.parse(localStorage.getItem('user')) || { fullName: 'Guest' };
const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
    createdBy: user.userId || 1, // Assuming userId is stored in localStorage
    assignedTo: '',
    groupId: ''
  });

  const [groups, setGroups] = useState([]);
  const [members, setMembers] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetch('https://localhost:7289/api/tickets/groups')
      .then(res => res.json())
      .then(setGroups);
  }, []);

  useEffect(() => {
    if (formData.groupId) {
      fetch(`https://localhost:7289/api/tickets/group-members/${formData.groupId}`)
        .then(res => res.json())
        .then(setMembers);
    }
  }, [formData.groupId]);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('https://localhost:7289/api/tickets/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      setSuccessMsg('Ticket created successfully!');
      setFormData({
        title: '', description: '', status: 'Open', priority: 'Medium',
        createdBy: 1, assignedTo: '', groupId: ''
      });
      setMembers([]);
    } else {
      alert('Ticket creation failed');
    }
  };

  return (
    // <div className="ticket-form">
    //   <h3>Create Ticket</h3>
    //   {successMsg && <p className="success">{successMsg}</p>}
    //   <form onSubmit={handleSubmit}>
    //     <input name="title" placeholder="Title" required onChange={handleChange} value={formData.title} />
    //     <textarea name="description" placeholder="Description" required onChange={handleChange} value={formData.description} />
    //     <select name="status" onChange={handleChange} value={formData.status}>
    //       <option>Open</option>
    //       <option>In Progress</option>
    //       <option>Closed</option>
    //     </select>
    //     <select name="priority" onChange={handleChange} value={formData.priority}>
    //       <option>Low</option>
    //       <option>Medium</option>
    //       <option>High</option>
    //       <option>Critical</option>
    //     </select>
    //     <select name="groupId" onChange={handleChange} value={formData.groupId}>
    //       <option value="">Select Group</option>
    //       {groups.map(group => (
    //         <option key={group.groupId} value={group.groupId}>{group.groupName}</option>
    //       ))}
    //     </select>
    //     <select name="assignedTo" onChange={handleChange} value={formData.assignedTo}>
    //       <option value="">Assign To</option>
    //       {members.map(member => (
    //         <option key={member.memberId} value={member.memberId}>{member.memberName}</option>
    //       ))}
    //     </select>
    //     <button type="submit">Create Ticket</button>
    //   </form>
    // </div>
    <div className="container mt-5">
      <div className="card shadow-lg rounded-4">
        <div className="card-body p-5">
          <h3 className="card-title mb-4 text-primary border-bottom pb-2">Create New Ticket</h3>

          {successMsg && (
            <div className="alert alert-success fw-semibold" role="alert">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="Enter ticket title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Describe the issue"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-6">
                <label className="form-label">Group</label>
                <select
                  name="groupId"
                  className="form-select"
                  value={formData.groupId}
                  onChange={handleChange}
                >
                  <option value="">Select Group</option>
                  {groups.map(group => (
                    <option key={group.groupId} value={group.groupId}>
                      {group.groupName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 col-md-6">
                <label className="form-label">Assign To</label>
                <select
                  name="assignedTo"
                  className="form-select"
                  value={formData.assignedTo}
                  onChange={handleChange}
                >
                  <option value="">Select Member</option>
                  {members.map(member => (
                    <option key={member.memberId} value={member.memberId}>
                      {member.memberName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-4 py-2 fw-semibold">
              <i className="bi bi-plus-circle me-2"></i>Create Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;