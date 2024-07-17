import React from 'react';
import './ViewIdeaModal.css';
import edit_icon from "../../../assets/png/edit.png";

const ViewIdeaModal = ({ closeModal }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>View Idea</h2>
        {/* Add modal content here */}
      </div>
    </div>
  );
};

export default ViewIdeaModal;





// <div className="idea-modal-container">
// <div className="view-idea-header">
//     <h2>Password Manager</h2>
//     <img src={edit_icon} alt="Pencil/Edit icon" />
//     <hr/>
// </div>
// <h4>Description</h4>
// <p>The purpose of our this project is to provide a highly secure and user-friendly solution for storing, managing, and accessing passwords and sensitive information, ensuring peace of mind and convenience for our users in their digital interactions.</p>
// <h4>Project Features</h4>
// <ol>
//     <li>Register/Login Page</li>
//     <li>Strong password generator</li>
//     <li>Manage passwords into database (use hashing to secure info)</li>
// </ol>
// <h4>Tag</h4>
// <div className="idea-tag">security</div>
// <div className="button-container">
//     <button>Delete</button>
//     <button>Cancel</button>
// </div>
// </div>