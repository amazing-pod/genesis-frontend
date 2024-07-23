import React, { useState } from 'react';
import './IdeationFeature.css';
import generate_features_image from "../../../../assets/png/generate_features.png";
import Dropdown from '../../../Shared/Dropdown/Dropdown';
import add_inactive_icon from "../../../../assets/png/add_inactive_purple.png";
import add_active_icon from "../../../../assets/png/add_active.png";

const IdeationFeature = ({ closeModal }) => {
    const [step, setStep] = useState(0);
    const [newFeatureText, setNewFeatureText] = useState('');
    const [editedFeatures, setEditedFeatures] = useState([]);
    const [icons, setIcons] = useState({});
    const [selectedIdea, setSelectedIdea] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [error, setError] = useState('');

    const ideaList = ['Smart Home Automation', 'Community Garden Initiative', 'Mobile App for Senior Citizens', 'Online Learning Platform', 'Local Artisan Marketplace', 'Green Energy Solutions'];

    const ideationFeatureDummyData = [
        {
            id: 1,
            name: "Voice Control",
            description: "Allow users to control devices using voice commands.",
        },
        {
            id: 2,
            name: "Energy Monitoring",
            description: "Track energy consumption of connected devices.",
        },
        {
            id: 3,
            name: "Remote Access",
            description: "Enable users to control home devices from anywhere via app.",
        },
        {
            id: 4,
            name: "Security Cameras",
            description: "Integrate security cameras for monitoring purposes.",
        },
        {
            id: 5,
            name: "Automated Irrigation",
            description: "Automate watering schedules for garden and plants.",
        },
    ];

    const addProjectIdea = () => {
        // Update database here, before modal closes.
        closeModal();
    };

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

    const handleDropdownChange = (value) => {
        setSelectedIdea(value);
    };

    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    };

    const addStep = () => {
        // Allow moving to the next step if either an idea is selected or a project description is provided
        if (ideaList || projectDescription.trim() !== '') {
            setError('');
            setStep(step + 1);
        } else {
            setError('Please select an idea from the dropdown or enter a project description.');
        }
    };

    const backtrackStep = () => {
        setStep(step - 1);
    };

    const handleIconClick = (id) => {
        setIcons((prevIcons) => ({
            ...prevIcons,
            [id]: prevIcons[id] === add_inactive_icon ? add_active_icon : add_inactive_icon,
        }));
    };

    const renderModalContent = () => {
        switch (step) {
            case 0:
                return (
                    <>
                        <div className="ideation-feature-user-info">
                            <h2>Add New Features</h2>
                            <hr />
                            <p>To generate project features, complete either of the following options:</p>
                            <p>1. Choose an existing idea:</p>
                            <Dropdown
                                dropdownPlaceholder={"Choose an idea:"}
                                dropdownOptions={ideaList}
                                onChange={handleDropdownChange}
                                value={selectedIdea}
                            />

                            <p>2. Otherwise, enter your project description</p>
                            <textarea
                                name="project-description"
                                value={projectDescription}
                                onChange={handleProjectDescriptionChange}
                                placeholder="Enter project description"
                                className="user-idea-info"
                            />

                            {error && <p className="error-message">{error}</p>}

                            <div className="ideation-feature-button-container">
                                <button className="generate" onClick={addStep}>Generate</button>
                                <button className="backtrack" onClick={closeModal}>Go Back</button>
                            </div>
                        </div>

                        <img className="generate-features-image" src={generate_features_image} alt="generate features image" />
                    </>
                );

            case 1:
                return (
                    <>
                        <div className="ideation-project-user-info">
                            <h2>Create Project Features</h2>
                            <p>Based on your previous project description, tell us any features you intend on implementing:</p>

                            <h2>Features:</h2>
                            {editedFeatures.map((feature, index) => (
                                <p key={index}>{index + 1}. {feature}</p>
                            ))}
                            <div className="add-item-container">
                                <textarea
                                    type="text"
                                    value={newFeatureText}
                                    onChange={handleNewFeatureChange}
                                    placeholder="Enter new feature"
                                    className="user-idea-info"
                                />
                                <div className="add-project-buttons">
                                    <button onClick={handleFeatureAdd}>Save</button>
                                    <button onClick={() => setNewFeatureText('')}>Clear</button>
                                </div>
                            </div>
                            <div className="project-ideation-button-container">
                                <button className="generate" onClick={addStep}>Generate</button>
                                <button className="backtrack" onClick={closeModal}>Go Back</button>
                            </div>
                        </div>
                        <img className="generate-projects-image" src={generate_features_image} alt="Project Ideation Image" />
                    </>
                );

            case 2:
                return (
                    <>
                        <div className="ideation-project-results">
                            <h2>Results</h2>
                            <p>Based on your responses, we believe the following project ideas may be best suited for you. To add an idea to your list, click the plus icon to the right of the project. <b>Scroll</b> down to see all generated ideas</p>

                            <div className="ideation-project-all-results">
                                {ideationFeatureDummyData.map((feature, index) => (
                                    <div className="ideation-feature-result" key={feature.id}>
                                        <div className="ideation-feature-info">
                                            <h2>{index + 1}. {feature.name}</h2>
                                            <p>{feature.description}</p>
                                        </div>
                                        <img
                                            src={icons[feature.id] || add_inactive_icon}
                                            alt="add-inactive-icon"
                                            onClick={() => handleIconClick(feature.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="project-ideation-button-container">
                                <button className="generate" onClick={closeModal}>Finish</button>
                                <button className="generate">Regenerate</button>
                                <button className="backtrack" onClick={backtrackStep}>Go Back</button>
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="ideation-feature-modal-container">
            {renderModalContent()}
        </div>
    );
};

export default IdeationFeature;
