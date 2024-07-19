import React, {useState, useEffect} from 'react';
import './AddIdea.css';
// Import main modal
import IdeationModal from '../IdeationModal';

const AddIdea = ( {closeModal}) => {
    const [newFeatureText, setNewFeatureText] = useState('');
    const [editedFeatures, setEditedFeatures] = useState([]);


    const addProjectIdea = () => {
        // Update database here, before modal closes.
        closeModal();
    }


    const handleFeatureAdd = () => {
        if (newFeatureText.trim() !== '') {
        const updatedFeatures = [...editedFeatures, newFeatureText];
        setEditedFeatures(updatedFeatures);
          setNewFeatureText(''); // Clear the input after adding
        }
    };

    const handleNewFeatureChange = (e) => {
        setNewFeatureText(e.target.value);
    };

    return (
        <>
            <h2>Add a new project idea</h2>
            <p>Enter the information below to add a new project to your list</p>
            <input type="text" placeholder='Project Name' />
            <p>Enter your intended project features below</p>
            <button onClick={addProjectIdea} >Finish</button>
            <button onClick={closeModal}>Go Back</button>
            <h2>Category</h2>
            <select name="option" id="" placeholder="Choose a category">
                <option value="Environment">Environment</option>
            </select>
            {/* Add respective items heree */}
            <h2>Features list</h2>
            <div className="add-item-container">
                <input
                type="text"
                value={newFeatureText}
                onChange={handleNewFeatureChange}
                placeholder="Enter new feature"
                className="new-feature-add"
                />
                <div className="modal-feature-container">
                    <button onClick={handleFeatureAdd}>Save</button>
                    <button onClick={() => setNewFeatureText('')}>Clear</button>
                </div>
                </div>
                <>
                
                {editedFeatures.map((feature, index) => (
                <p key={index}>{index + 1}. {feature}</p>
                ))}
            </>


        </>
    );
};

export default AddIdea;