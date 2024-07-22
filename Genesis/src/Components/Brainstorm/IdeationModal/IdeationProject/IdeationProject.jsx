import React, { useState } from 'react';
import './IdeationProject.css';
import help_icon from "../../../../assets/png/help_icon.png"
import generate_projects_image from "../../../../assets/png/generate_projects.png"


// Import main modal
import IdeationModal from '../IdeationModal';

const IdeationProject = ( {closeModal}) => {
    const [step, setStep] = useState(0);

    const addStep = () => {
        setStep(step + 1);
    }

    const backtrackStep = () => {
        setStep(step - 1);
    }

    const renderModalContent = () => {
        switch (step) {
            // When step is 0, go back to main modal
            case 0:
                return (
                    <>
                        <h2>Create Project Ideas</h2>
                        <hr />
                        <p>To generate project ideas, complete the following steps below:</p>
                        <p>1. Choose a category</p>
                        <select name="option" id="add-idea-dropdown" placeholder="Choose a category">
                            <option value="Environment">Environment</option>
                            <option value="Environment">Technology</option>
                            <option value="Environment">Healthcare</option>
                            <option value="Environment">News</option>
                            <option value="Environment">Gaming</option>
                            <option value="Environment">Education</option>
                        </select>
                        <p>2. Based on your chosen category, describe any issues you would like your project to address</p>

                        {/* Take user to main modal */}
                        <button onClick={addStep}>Proceed</button>
                        <button onClick={closeModal}>Go Back</button>
                    </>
                );
            // Base Case: User is on main project ideas section
            case 1:
                return (
                    <>
                        <p>Step 1: Generate ideation project works!</p>
                        {/* Take user to main modal */}
                        <button onClick={addStep}>Proceed</button>
                        <button onClick={backtrackStep}>Go Back</button>
                    </>
                );
            case 2:
                return (
                    <>
                        <p>Step 2, List of generated user steps: </p>
                        {/* Take user to main modal */}
                        <button onClick={closeModal}>Go Back</button>
                        <button onClick={backtrackStep}>Go Back</button>
                    </>
                );
        }
    };


    return (
        <div className="modal">
            <div className="ideation-modal-content">
                {renderModalContent()}
            </div>
        </div>
    );


};

export default IdeationProject;