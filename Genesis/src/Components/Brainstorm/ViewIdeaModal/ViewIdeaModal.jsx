import React from 'react';
import './ViewIdeaModal.css';
import edit_icon from "../../../assets/png/edit.png";
import close_icon from "../../../assets/png/close.png"

const ViewIdeaModal = ({ idea, closeModal }) => {
  const projectFeatures = idea.projectFeatures;

  const handleEditClick = () => {
    // Implement edit functionality here
    console.log('Edit icon clicked');
    // Add your logic for handling edit action
  };

  return (
    <div className="modal">
      <div className="idea-modal-content">
      <div className="view-idea-container">
      <div className="view-idea-header">
        <h2>{idea.title}</h2>
        <img src={edit_icon} alt="edit icon" onClick={handleEditClick}/>
      </div>
        <hr />
        
        <h3>Description</h3>
        <p>{idea.description}</p>
        {/* Additional content here */}
        <h3>Project Features</h3>
        {projectFeatures.map((feature, index) => (
          <p key={index}>{index+1}. {feature}</p>
        ))}
        <h3>Category</h3>
        <p className='idea-tag'>{idea.category}</p>
      </div>

      <div className="view-idea-footer">
          <div className="button-container">
            <button>Delete</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewIdeaModal;
