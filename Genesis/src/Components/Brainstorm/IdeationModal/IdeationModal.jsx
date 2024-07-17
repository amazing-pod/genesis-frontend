import React from 'react';
import './IdeationModal.css';
import edit_icon from "../../../assets/png/edit.png";

const IdeationModal = ({ closeModal }) => {
    return (
    <div className="modal">
        <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <h2>Ideation Modal works!</h2>
        {/* Add modal content here */}
        <p>hi</p>
        </div>
    </div>
    );
};

export default IdeationModal;