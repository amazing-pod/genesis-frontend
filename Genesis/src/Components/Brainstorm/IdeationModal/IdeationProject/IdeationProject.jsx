import React, { useState } from 'react';
import './IdeationProject.css';
import logo from "../../../../assets/png/close.png"
import generate_projects_image from "../../../../assets/png/generate_projects.png"
import help_icon from "../../../../assets/png/help_icon.png"
// Import main modal
import IdeationModal from '../IdeationModal';
import Dropdown from '../../../Shared/Dropdown/Dropdown';
import add_inactive_icon from "../../../../assets/png/add_inactive_purple.png";
import add_active_icon from "../../../../assets/png/add_active.png"

const IdeationProject = ( {closeModal}) => {
    const [step, setStep] = useState(0);
    const [newFeatureText, setNewFeatureText] = useState('');
    const [editedFeatures, setEditedFeatures] = useState([]);
    const [icons, setIcons] = useState({});
    const [showTooltip, setShowTooltip] = useState(false);

    const ideationProjectDummyData = [
        {
            id: 1,
            name: "Health Monitoring System",
            description: "Develop a system to monitor vital signs and health metrics remotely, providing real-time data to healthcare providers.",
        },
        {
            id: 2,
            name: "Environmental Monitoring Network",
            description: "Build a network of IoT sensors to monitor air quality, water levels, and other environmental factors in urban areas.",
        },
        {
            id: 3,
            name: "Food Delivery Optimization",
            description: "Optimize food delivery routes and scheduling to reduce delivery times and improve customer satisfaction.",
        },
        {
            id: 4,
            name: "Virtual Reality Training Simulator",
            description: "Develop a VR simulator for training purposes in industries such as healthcare, aviation, and engineering.",
        },
    ];
    


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

    const addStep = () => {
        setStep(step + 1);
    }

    const backtrackStep = () => {
        setStep(step - 1);
    }

    const handleIconClick = (id) => {
        setIcons((prevIcons) => ({
            ...prevIcons,
            [id]: prevIcons[id] === add_inactive_icon ? add_active_icon : add_inactive_icon,
        }));
    };

    const renderModalContent = () => {
        switch (step) {
            // When step is 0, go back to main modal
            case 0:
                return (
                    <>
                    <div className="ideation-project-user-info">
                    <h2>Create Project Ideas</h2>
                        <p>To generate project ideas, complete the following steps below:</p>
                        {/* <h2 className="category-choice">Choose a category</h2> */}
                        <span className='ideation-project-text-format'><p>1.</p><Dropdown dropdownOptions={['Education', 'Environment', 'Healthcare', 'News',  'Technology',]}/></span>
                        <span>
                        <p>2. Based on your chosen category, describe any issues you would like your project to address</p>
                        </span>
                        <div 
                        className="tooltip-container"
                        onMouseEnter={() => setShowTooltip(true)}
                     onMouseLeave={() => setShowTooltip(false)}
                         >
                        <img src={help_icon} alt="help icon" />
                         {showTooltip && (
                             <div className="tooltip-text">Struggling? Think and research any issues you observe within your local, school or other personal communities</div>
                            )}
                         </div>
                {/* Add respective items here */}
                <h2>Issues:</h2>
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
                    <>
                    </>
                        {/* Take user to main modal */}
                        <div className="project-ideation-button-container">
                            <button className="generate" onClick={addStep}>Generate</button>
                            <button className="backtrack" onClick={closeModal}>Go Back</button>
                        </div>
                        
                    </div>
                    <img className="generate-projects-image" src={generate_projects_image} alt="Project Ideation Image" />
                    </>
                );
            // Base Case: User is on main project ideas section
            case 1:
                return (
                    <>
                    <div className="ideation-project-results" >
                        <h2>Results</h2>
                        <p>Based on your responses, we believe the following project ideas 
                            may be best suited for you. To add an idea to your list, click
                            the plus icon to the right of the project. <b>Scroll</b> down to see all generated ideas</p>
                        
                        {/* Generated Feature Results: */}
                        <div className="ideation-project-all-results">
                        {ideationProjectDummyData.map((feature, index) => (
                        <>
                        <div className="ideation-feature-result">
                            <div className="ideation-feature-info">
                            <h2>{index+1}. {feature.name}</h2>
                            <p>{feature.description}</p>
                            </div>
                            <img 
                           src={icons[feature.id] || add_inactive_icon} 
                           alt="add-inactive-icon" 
                           onClick={() => handleIconClick(feature.id)} 
                           style={{ cursor: 'pointer' }} /> 
                                 
                        </div>
                        </>
                        ))}
                        </div>

                        
                        
                        {/* Modal Actions + Navigations */}
                        <div className="project-ideation-button-container">
                            <button className="generate" onClick={closeModal}>Finish</button>
                            <button className="generate">Regenerate</button>
                            <button className="backtrack" onClick={backtrackStep}>Go Back</button>
                        </div>



                    </div>
                    </>
                );
        }
    };


    return (
        <div className="ideation-project-modal-container">
            {renderModalContent()}
        </div>
    );


};

export default IdeationProject;