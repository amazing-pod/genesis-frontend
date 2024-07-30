import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddIdea.css";
import add_idea_graphic from "../../../../assets/png/add_idea.png";
// Import relevant modals
import IdeationModal from "../IdeationModal";
import Dropdown from "../../../Shared/Dropdown/Dropdown";

const AddIdea = ({ closeModal }) => {
	const [newFeatureText, setNewFeatureText] = useState("");
	const [editedFeatures, setEditedFeatures] = useState([]);
	const [newFeatureName, setNewFeatureName] = useState("");
	const [newFeatureDescription, setNewFeatureDescription] = useState("");

	const addProjectIdea = () => {
		closeModal();

		const createIdea = async () => {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_DEV_URL}/api/chat`,
				{
					prompt: `Based on the category: Healthcare, title: ${newFeatureName}, description: ${newFeatureDescription}, and the following features: ${editedFeatures}, provide only a numeric impact, feasibility, and difficulty rating out of 5 for this project idea always in this exact format without any white space: impact:#,feasibility: #,difficulty:#`,
				}
			);

			console.log(response.data);

			const matches = response.data.response.match(/\d+/g);
			const [impact, feasibility, difficulty] = matches.map(Number);
			console.log(impact, feasibility, difficulty);

			const response2 = await axios.post(
				`${
					import.meta.env.VITE_GENESIS_API_DEV_URL
				}/projects/clz2ezc320001d25xpih95js7`,
				{
					title: newFeatureName,
					description: newFeatureDescription,
					category: "Education",
					features: editedFeatures,
					tags: [],
					impact,
					feasibility,
					difficulty,
				}
			);

			console.log(response2.data);
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
						{editedFeatures.map((feature, index) => (
							<p key={index}>
								{index + 1}. {feature}
							</p>
						))}
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
