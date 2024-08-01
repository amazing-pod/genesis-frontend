import React, { useEffect, useState } from "react";
import "./ViewIdeaModal.css";
import axios from "axios";
import edit_icon from "../../../assets/png/edit.png";
import close_icon from "../../../assets/png/close.png";
import remove_icon from "../../../assets/svg/remove.svg";
import add_icon from "../../../assets/png/add_inactive_pink.png";

const ProjectFeatureGenerator = ({
	projectId,
	ideaId,
	category,
	title,
	description,
	issues,
	features,
	option,
	editedFeatures,
	setEditedFeatures,
}) => {
	const fetchFeatureSuggestion = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_URL}/api/chat`,
				{
					prompt: `Based on the provided category: ${category}, title: ${title}, description: ${description}, related issues: ${issues}, and existing features: ${features}, suggest exactly one specific valuable distinct feature that can enhance the project in a concise manner. Do not provide justification. Never preface the feature with anything. Never end in a period or comma`,
				}
			);
			console.log(response.data);

			setEditedFeatures([...editedFeatures, response.data.response]);
		} catch (error) {
			console.error("Error fetching feature suggestion:", error);
		}
	};

	const fetchFeatureSuggestionAndAdd = async () => {
		const response = await axios.post(
			`${import.meta.env.VITE_GENESIS_API_URL}/api/chat`,
			{
				prompt: `Based on the provided category: ${category}, title: ${title}, description: ${description}, related issues: ${issues}, and existing features: ${features}, suggest exactly one specific valuable distinct feature that can enhance the project in a concise manner. Do not provide justification. Never preface the feature with anything. Never end in a period or comma`,
			}
		);
		console.log(response.data);

		setEditedFeatures([...editedFeatures, response.data.response]);

		const response2 = await axios.put(
			`${
				import.meta.env.VITE_GENESIS_API_URL
			}/projects/${projectId}/ideas/${ideaId}/features`,
			{
				feature: response.data.response,
			}
		);
		console.log(response2.data);
	};

	return (
		<div>
			<button onClick={fetchFeatureSuggestionAndAdd}>
				Generate Project Feature
			</button>
		</div>
	);
};
const ViewIdeaModal = ({ idea, closeModal, onSave }) => {
	const [editing, setEditing] = useState(false);
	const [editedTitle, setEditedTitle] = useState(idea.title);
	const [editedDescription, setEditedDescription] = useState(idea.description);
	const [editedFeatures, setEditedFeatures] = useState([]);
	const [selectedTag, setSelectedTag] = useState(idea.category);
	const [newFeatureText, setNewFeatureText] = useState("");
	const [generatedIdeas, setGeneratedIdeas] = useState([]);

	useEffect(() => {
		setEditedFeatures([...idea.features]);
	}, []);

	const handleEditClick = () => {
		setEditing(true);
	};

	const handleSaveClick = () => {
		const updatedIdea = {
			...idea,
			title: editedTitle,
			description: editedDescription,
			projectFeatures: editedFeatures,
			category: selectedTag,
		};

		onSave(updatedIdea);
		setEditing(false);
	};

	const handleCancelClick = () => {
		// Reset fields to original values
		setEditedTitle(idea.title);
		setEditedDescription(idea.description);
		setEditedFeatures([...idea.features]);
		setSelectedTag(idea.category);

		// Exit editing mode
		setEditing(false);
	};

	const handleFeatureRemove = (index) => {
		const updatedFeatures = [...editedFeatures];
		updatedFeatures.splice(index, 1);
		setEditedFeatures(updatedFeatures);
	};

	const handleFeatureAdd = () => {
		if (newFeatureText.trim() !== "") {
			const updatedFeatures = [...editedFeatures, newFeatureText];
			setEditedFeatures(updatedFeatures);
			setNewFeatureText(""); // Clear the input after adding
		}
	};

	const handleNewFeatureChange = (e) => {
		setNewFeatureText(e.target.value);
	};

	const handleTagChange = (event) => {
		setSelectedTag(event.target.value);
	};

	return (
		<div className="modal">
			<div className="idea-modal-content">
				<div className="view-idea-container">
					<div className="view-idea-header">
						{editing ? (
							<>
								<input
									className="edit-idea-title"
									type="text"
									value={editedTitle}
									onChange={(e) => setEditedTitle(e.target.value)}
								/>
								<img
									src={close_icon}
									alt="close icon"
									onClick={handleCancelClick}
								/>
							</>
						) : (
							<>
								<h2>{idea.title}</h2>
								<img
									src={edit_icon}
									alt="edit icon"
									onClick={handleEditClick}
								/>
							</>
						)}
					</div>
					<hr />

					<h3>Description</h3>
					{editing ? (
						<textarea
							value={editedDescription}
							onChange={(e) => setEditedDescription(e.target.value)}
							className="edit-idea-description"
						/>
					) : (
						<p>{idea.description}</p>
					)}

					<h3>Project Features</h3>
					{generatedIdeas.length > 0 && (
						<div>
							<h3>Generated Project Feature:</h3>
							<ul>
								{generatedIdeas.map((idea, index) => (
									<li key={index}>{idea.feature}</li>
								))}
							</ul>
						</div>
					)}

					{editing ? (
						<>
							{editedFeatures.map((feature, index) => (
								<div className="feature-item-container" key={index}>
									<p>
										{index + 1}. {feature}
									</p>
									<img
										className="remove-icon"
										src={remove_icon}
										alt="remove icon"
										onClick={() => handleFeatureRemove(index)}
									/>
								</div>
							))}
							<h3>New Features:</h3>
							<div className="add-item-container">
								<input
									type="text"
									value={newFeatureText}
									onChange={handleNewFeatureChange}
									placeholder="Enter new feature"
									className="new-feature-add"
								/>
								<button onClick={handleFeatureAdd}>Save</button>
								<button onClick={() => setNewFeatureText("")}>Clear</button>
							</div>
						</>
					) : (
						<>
							{editedFeatures.map((feature, index) => (
								<p key={index}>
									{index + 1}. {feature}
								</p>
							))}
						</>
					)}

					<ProjectFeatureGenerator
						projectId={idea.projectId}
						ideaId={idea.id}
						category={selectedTag}
						title={editedTitle}
						description={editedDescription}
						issues={[]}
						features={editedFeatures}
						option={selectedTag}
						editedFeatures={editedFeatures}
						setEditedFeatures={setEditedFeatures}
					/>

					<h3>Category</h3>
					{editing ? (
						<select value={selectedTag} onChange={handleTagChange}>
							<option value="" disabled hidden>
								Choose a category
							</option>
							<option value="security"></option>
							<option value="travel">Travel</option>
							<option value="healthcare">Healthcare</option>
							<option value="environment">Environment</option>
							<option value="technology">Technology</option>
						</select>
					) : (
						<p className="idea-tag">{idea.category}</p>
					)}
				</div>

				{/* <select>
        <option hidden>Sex</option>
        <option>Male</option>
        <option>Female</option>
      </select> */}

				<div className="view-idea-footer">
					<div className="button-container">
						{editing ? (
							<>
								<button onClick={handleSaveClick}>Save</button>
								<button onClick={handleCancelClick}>Cancel</button>
							</>
						) : (
							<button onClick={closeModal}>Close</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewIdeaModal;
