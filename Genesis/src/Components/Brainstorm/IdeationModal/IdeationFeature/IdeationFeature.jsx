import React, {useState, useEffect} from 'react';
import './IdeationFeature.css';
// Import main modal
import IdeationModal from '../IdeationModal';


const IdeationFeature = ( {closeModal} ) => {
    
    return (
        <>
        <p>Generate project features works!</p>
        {/* Take user to main modal */}
        <button onClick={closeModal}>Go Back</button>
        </>
    );
};

export default IdeationFeature;