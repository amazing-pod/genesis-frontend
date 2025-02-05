import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddIdea.css";
import add_idea_graphic from "../../../../assets/png/add_idea.png";
// Import relevant modals
import IdeationModal from "../IdeationModal";
import Dropdown from "../../../Shared/Dropdown/Dropdown";
import { useDropdown } from "../../../../context/DropdownContext";
import { useProject } from "../../../../context/ProjectContext";

const AddIdea = ({ closeModal }) => {
	const [newFeatureText, setNewFeatureText] = useState("");
	const [editedFeatures, setEditedFeatures] = useState([]);
	const [newFeatureName, setNewFeatureName] = useState("");
	const [newFeatureDescription, setNewFeatureDescription] = useState("");
	const { option } = useDropdown();
	const { project } = useProject();

	const addProjectIdea = () => {
		closeModal();

		const createIdea = async () => {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_URL}/api/chat`,
				{
					prompt: `Based on the category: ${option}, title: ${newFeatureName}, description: ${newFeatureDescription}, and the following features: ${editedFeatures}, provide only a numeric impact, feasibility, and difficulty rating out of 5 for this project idea always in this exact format without any white space: impact:#,feasibility: #,difficulty:#`,
				}
			);


			const matches = response.data.response.match(/\d+/g);
			const [impact, feasibility, difficulty] = matches.map(Number);

			const response2 = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_URL}/projects/${project}/ideas`,
				{
					title: newFeatureName,
					description: newFeatureDescription,
					category: option,
					features: editedFeatures,
					tags: [],
					impact,
					feasibility,
					difficulty,
				}
			);
			window.location.reload();
		};
		createIdea();
	};

	const handleNewNameChange = (e) => {
		setNewFeatureName(e.target.value);
	};

	const handleNewDescriptionChange = (e) => {
		setNewFeatureDescription(e.target.value);
	};

	const handleFeatureAdd = () => {
		if (newFeatureText.trim() !== "") {
			const updatedFeatures = [...editedFeatures, newFeatureText];
			setEditedFeatures(updatedFeatures);
			setNewFeatureText("");
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
						<span className="ideation-project-text-format">
							<p>1.</p>
							<Dropdown
								dropdownPlaceholder="Choose a category:"
								dropdownOptions={[
									"Education",
									"Environment",
									"Healthcare",
									"News",
									"Technology",
								]}
							/>
						</span>
						{/* Add respective items here */}
						<h2>Project Name:</h2>
						<input
							type="text"
							value={newFeatureName}
							onChange={handleNewNameChange}
							placeholder="Project Title..."
						/>

						<h2>Description:</h2>
						<textarea
							type="text"
							value={newFeatureDescription}
							onChange={handleNewDescriptionChange}
							placeholder="Enter description"
							className="idea-description-info"
						></textarea>

						<h2>Features:</h2>
						<div className="feature-issues-container">

						{editedFeatures.map((feature, index) => (
							<p key={index}>
								{index + 1}. {feature}
							</p>
						))}
						</div>
						<div className="add-item-container">
							{/* <textarea name="" id=""></textarea> */}
							<textarea
								type="text"
								value={newFeatureText}
								onChange={handleNewFeatureChange}
								placeholder="Enter new issue"
								className="user-idea-info"
							></textarea>
							<div className="add-project-buttons">
								<button onClick={handleFeatureAdd}>Save</button>
								<button onClick={() => setNewFeatureText("")}>Clear</button>
							</div>
						</div>
						{/* Take user to main modal */}
						<div className="project-ideation-button-container">
							<button className="generate" onClick={addProjectIdea}>
								Finish
							</button>
							<button className="backtrack" onClick={closeModal}>
								Go Back
							</button>
						</div>
					</div>

					<></>
					<img
						className="add-ideas-image"
						src={add_idea_graphic}
						alt="Project Ideation Image"
					/>
				</div>
			</>
		</>
	);
};

export default AddIdea;
