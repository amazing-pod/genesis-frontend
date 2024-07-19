import React, {useState, useEffect} from 'react';
import './IdeationFeature.css';
// Import main modal
import IdeationModal from '../IdeationModal';


const IdeationFeature = ( {closeModal} ) => {
    const [step, setStep] = useState(1);

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
                        <p>Step 0: Generate ideation project works!</p>
                        {/* Take user to main modal */}
                        <button onClick={addStep}>Proceed</button>
                        <button onClick={closeModal}>Go Back</button>
                    </>
                );
            // Base Case: User is on main project ideas section
            case 1:
                return (
                    <>
                        <p>Step 1: Generate ideation features works!</p>
                        {/* Take user to main modal */}
                        <button onClick={addStep}>Proceed</button>
                        <button onClick={backtrackStep}>Go Back</button>
                    </>
                );
            case 2:
                return (
                    <>
                        <p>Step 2, List of generated user features: </p>
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

export default IdeationFeature;