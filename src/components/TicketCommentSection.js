import React, { useEffect, useState } from 'react';
import axios from 'axios';

// const TicketCommentSection = ({ ticketId, userId }) => {
//   const [comments, setComments] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchComments();
//   }, [ticketId]);

//   const fetchComments = async () => {
//     const response = await axios.get(`https://localhost:7289/api/TicketComments/${ticketId}`);
//     setComments(response.data);
//   };

//   const sendComment = async () => {
//     if (!message.trim()) return;

//     await axios.post(`https://localhost:7289/api/TicketComments`, {
//       ticketId,
//       userId,
//       message
//     });

//     setMessage('');
//     fetchComments(); // In future, replace with SignalR
//   };

//   return (
//     <div className="card mt-4">
//       <div className="card-header"><h5>Comments</h5></div>
//       <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//         {comments.map((c, index) => (
//           <div key={index} className="d-flex mb-3">
//             <img src={`data:image/png;base64,${c.profilePicture}`} alt="profile" className="rounded-circle me-2" style={{ width: '40px', height: '40px' }} />
//             <div>
//               <strong>{c.userName}</strong> <small className="text-muted">{new Date(c.createdAt).toLocaleString()}</small>
//               <div>{c.message}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="card-footer d-flex">
//         <input
//           type="text"
//           className="form-control me-2"
//           placeholder="Type your comment..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={sendComment}>Send</button>
//       </div>
//     </div>
//   );
// };

const TicketCommentSection = ({ ticketId, userId }) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchComments();
  }, [ticketId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://localhost:7289/api/TicketComments/${ticketId}`);
      setComments(response.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const sendComment = async () => {
    if (!message.trim()) return;

    const formData = new FormData();
    formData.append("commentDto.TicketId", ticketId);
    formData.append("commentDto.UserId", userId);
    formData.append("commentDto.Message", message);
    // Append file only if selected
    if (selectedFile) {
    formData.append("file", selectedFile); // ⚠️ must match parameter name in API
  }

    try {
      await axios.post(`https://localhost:7289/api/TicketComments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage('');
      setSelectedFile(null);
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const renderAttachments = (attachments) => {
  if (!attachments || attachments.length === 0) return null;

  return attachments.map((attachment, index) => {
    const { filePath, fileType } = attachment;
    const fileName = filePath.split('\\').pop();

    if (fileType.startsWith('image/')) {
      return (
        <img
          key={index}
          src={`https://localhost:7289/${filePath}`}
          alt="Attachment"
          className="img-fluid mt-2"
          style={{ maxWidth: '200px', borderRadius: '10px' }}
        />
      );
    }

    return (
      <div className="mt-2" key={index}>
        <a
          href={`https://localhost:7289/${filePath}`}
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          📎 Download: {fileName}
        </a>
      </div>
    );
  });
};


  return (
    <div className="card mt-4">
      <div className="card-header"><h5>Comments</h5></div>
      <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {comments.map((c, index) => (
          <div key={index} className="d-flex mb-3">
            <img
              src={`data:image/png;base64,${c.profilePicture}`}
              alt="profile"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <strong>{c.userName}</strong>{' '}
              <small className="text-muted">{new Date(c.createdAt).toLocaleString()}</small>
              <div>{c.message}</div>
              {renderAttachments(c.attachments)}
            </div>
          </div>
        ))}
      </div>

      <div className="card-footer">
        <div className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type your comment..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="file"
            className="form-control me-2"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />
          <button className="btn btn-primary" onClick={sendComment}>Send</button>
        </div>
        {file && (
          <div className="text-muted">
            <small>Selected file: {file.name}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCommentSection;
