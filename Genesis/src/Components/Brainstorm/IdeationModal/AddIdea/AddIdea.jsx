import React, {useState, useEffect} from 'react';
import "./AddIdea.css";
import add_idea_graphic from "../../../../assets/png/add_idea.png"
// Import relevant modals
import IdeationModal from '../IdeationModal';
import Dropdown from "../../../Shared/Dropdown/Dropdown";


const AddIdea = ( {closeModal}) => {
    const [newFeatureText, setNewFeatureText] = useState('');
    const [editedFeatures, setEditedFeatures] = useState([]);


    const addProjectIdea = () => {
        closeModal();
    }


    const handleFeatureAdd = () => {
        if (newFeatureText.trim() !== '') {
        const updatedFeatures = [...editedFeatures, newFeatureText];
        setEditedFeatures(updatedFeatures);
            setNewFeatureText('');
        }
    };

    const handleNewFeatureChange = (e) => {
        setNewFeatureText(e.target.value);
    };

    return (
        <>
        <>
        <div className="ideation-add-project">
            <div className="ideation-feature-user-info">
                <h2>Add a new project idea</h2>
                <p>Enter the information below to add a new project to your list</p>
                {/* Add respective items here */}
                <h2>Project Name:</h2>
                <input type="text" placeholder='Project Title...'/>
                <h2>Features:</h2>
                {editedFeatures.map((feature, index) => (
                    <p key={index}>{index + 1}. {feature}</p>
                ))}
                <div className="add-item-container">
                    {/* <textarea name="" id=""></textarea> */}
                    <textarea
                    type="text"
                    value={newFeatureText}
                    onChange={handleNewFeatureChange}
                    placeholder="Enter new issue"
                    className="user-idea-info"
                    >
                    </textarea>
                    <div className="add-project-buttons">
                        <button onClick={handleFeatureAdd}>Save</button>
                        <button onClick={() => setNewFeatureText('')}>Clear</button>
                    </div>

                    </div>
                    {/* Take user to main modal */}
                    <div className="project-ideation-button-container">
                        <button className="generate" onClick={closeModal}>Finish</button>
                        <button className="backtrack" onClick={closeModal}>Go Back</button>
                    </div>
                </div>

                <>
                </>
                <img className="add-ideas-image" src={add_idea_graphic} alt="Project Ideation Image" />                
                </div>
                </>                

        </>
    );
};

export default AddIdea;