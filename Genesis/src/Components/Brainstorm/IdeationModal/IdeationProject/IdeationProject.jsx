import React, { useState } from 'react';
import './IdeationProject.css';
import logo from "../../../../assets/png/close.png"
// Import main modal
import IdeationModal from '../IdeationModal';

const IdeationProject = ( {closeModal}) => {
    
    return (
        <>
        <p>Generate ideation project works!</p>
        {/* Take user to main modal */}
        <button onClick={closeModal}>Go Back</button>
        </>
    );
};

export default IdeationProject;