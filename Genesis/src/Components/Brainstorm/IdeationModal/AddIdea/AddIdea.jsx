import React, {useState, useEffect} from 'react';
import './AddIdea.css';
// Import main modal
import IdeationModal from '../IdeationModal';

const AddIdea = ( {closeModal}) => {
    const [step, setStep] = useState(0);


    const addProjectIdea = () => {
        // Update database here, before modal closes.
        closeModal();
    }
    // const addStep = () => {
    //     setStep(step + 1);
    // }
    return (
        <>
            <h2>Add a new project idea</h2>
            <p>Enter the information below to add a new project to your list</p>
            <input type="text" placeholder='Project Name' />
            <p>Enter your intended project features below</p>
            <button onClick={addProjectIdea} >Finish</button>
            <button onClick={closeModal}>Go Back</button>
        </>
    );
};

export default AddIdea;