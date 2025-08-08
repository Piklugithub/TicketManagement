import React, { useEffect, useState } from 'react';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt, FaDownload } from "react-icons/fa";
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
  const getFileIcon = (fileType) => {
    if (fileType.includes("pdf")) return <FaFilePdf className="text-danger me-2" size={20} />;
    if (fileType.includes("word") || fileType.includes("doc")) return <FaFileWord className="text-primary me-2" size={20} />;
    if (fileType.includes("excel") || fileType.includes("spreadsheet")) return <FaFileExcel className="text-success me-2" size={20} />;
    if (fileType.includes("image")) return <FaFileImage className="text-warning me-2" size={20} />;
    return <FaFileAlt className="text-secondary me-2" size={20} />; // default file icon
  };
  const isImageFile = (fileType) => {
    if (!fileType) return false;
    const ext = fileType.toLowerCase();
    return [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".svg"].includes(ext);
  };
  const renderAttachments = (attachments) => {
  if (!attachments || attachments.length === 0) return null;

  return attachments.map((attachment, index) => {
    const { filePath, fileType,fileName } = attachment;
    if (isImageFile(fileType)) {
      return (
        <img
          key={index}
          src={`https://localhost:7289/${filePath}`}
          alt="Attachment"
          className="img-fluid mt-2"
          style={{ maxWidth: '500px', borderRadius: '10px' }}
        />
      );
    } 
    else 
      {
       return (
         <div
           key={index}
           className="d-flex align-items-center justify-content-between border p-2 rounded mb-2"
           style={{ background: "#f9f9f9" }}
         >
          <div className="d-flex align-items-center">
            {getFileIcon(fileType)}
            <span className="fw-bold">{fileName}</span>
          </div>
          <a
            href={`https://localhost:7289/${filePath}`}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary btn-sm d-flex align-items-center"
          >
            <FaDownload className="me-1" /> Download
          </a>
        </div>
      );
    }
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
