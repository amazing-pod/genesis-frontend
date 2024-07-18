import React from 'react';
import './IdeationProject.css';
import logo from "../../../../assets/png/close.png"

const IdeationProject = ( {closeModal}) => {
    return (
        <>
            <p>Generate ideation project works!</p>
            <img src={logo} alt="Close logo" onClick={closeModal} />        
        </>
    );
};

export default IdeationProject;