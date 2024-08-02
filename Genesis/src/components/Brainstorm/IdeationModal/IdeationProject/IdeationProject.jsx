import { useState } from "react";
import "./IdeationProject.css";
import logo from "../../../../assets/png/close.png";
import generate_projects_image from "../../../../assets/png/generate_projects.png";
import help_icon from "../../../../assets/png/help_icon.png";
// Import main modal
import IdeationModal from "../IdeationModal";
import Dropdown from "../../../Shared/Dropdown/Dropdown";
import add_inactive_icon from "../../../../assets/png/add_inactive_purple.png";
import add_active_icon from "../../../../assets/png/add_active.png";
import axios from "axios";
import { useDropdown } from "../../../../context/DropdownContext";
import { useProject } from "../../../../context/ProjectContext";

const IdeationProject = ({ closeModal }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [step, setStep] = useState(0);
	const [newFeatureText, setNewFeatureText] = useState("");
	const [editedIssues, setEditedIssues] = useState([]);
	const [icons, setIcons] = useState({});
	const [chosenIdeas, setChosenIdeas] = useState([]);
	const [showTooltip, setShowTooltip] = useState(false);
	const [ideationProjectData, setIdeationProjectData] = useState([]);
	const { option } = useDropdown();
	const { project } = useProject();

	const ideationProjectDummyData = [
		{
			id: 1,
			name: "Health Monitoring System",
			description:
				"Develop a system to monitor vital signs and health metrics remotely, providing real-time data to healthcare providers.",
		},
		{
			id: 2,
			name: "Environmental Monitoring Network",
			description:
				"Build a network of IoT sensors to monitor air quality, water levels, and other environmental factors in urban areas.",
		},
		{
			id: 3,
			name: "Food Delivery Optimization",
			description:
				"Optimize food delivery routes and scheduling to reduce delivery times and improve customer satisfaction.",
		},
		{
			id: 4,
			name: "Virtual Reality Training Simulator",
			description:
				"Develop a VR simulator for training purposes in industries such as healthcare, aviation, and engineering.",
		},
	];

	const addProjectIdea = () => {
		const createIdeas = async () => {
			const response = await axios.post(
				`${
					import.meta.env.VITE_GENESIS_API_URL
				}/projects/${project}/ideas/bulk`,
				{
					ideas: chosenIdeas,
				}
			);

			console.log(response.data);
		};

		createIdeas();
		closeModal();
	};

	const handleFeatureAdd = () => {
		if (newFeatureText.trim() !== "") {
			const updatedFeatures = [...editedIssues, newFeatureText];
			setEditedIssues(updatedFeatures);
			setNewFeatureText(""); // Clear the input after adding
		}
	};

	const handleNewFeatureChange = (e) => {
		setNewFeatureText(e.target.value);
	};

	const addStep = () => {
		setIsLoading(true); // Set loading state to true
		const generateIdeas = async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/api/chat`,
					{
						prompt: `Generate a list of 5 distinct project ideas given the category: ${option} and the issues: ${editedIssues}. Each idea should include a highly appropriate title, a useful description, a highly accurate impact rating, a highly accurate feasibility rating, and a highly accurate difficulty rating. The list should always be in the following format exactly: [{title: 'Virtual Classroom Enhancer', description: 'A tool to create interactive and engaging virtual classrooms with real-time collaboration features.', impact: 5, feasibility: 4, difficulty: 3},{title: 'AI-Powered Tutoring Assistant', description: 'An AI-driven tutoring assistant that provides personalized help to students based on their learning progress.', impact: 4, feasibility: 3, difficulty: 4},{title: 'Gamified Learning Platform', description: 'A platform that uses game mechanics to make remote learning more engaging and motivating for students.', impact: 4, feasibility: 3, difficulty: 3},{title: 'Remote Lab Simulator', description: 'A simulator that allows students to conduct virtual lab experiments and gain hands-on experience remotely.', impact: 5, feasibility: 3, difficulty: 4},{title: 'Collaborative Study Space', description: 'An online space where students can study together, share resources, and support each other's learning.', impact: 3, feasibility: 5, difficulty: 2}]. Please generate the ideas. Never use new line. Never end with period`,
					}
				);
				console.log(response.data);
	
				let generatedIdeas = JSON.parse(
					response.data.response
						.replace(/([{,]\s*)(\w+):/g, '$1"$2":')
						.replace(/'/g, '"')
				);
	
				generatedIdeas = generatedIdeas.map((object) => ({
					...object,
					category: option,
				}));
	
				console.log(generatedIdeas);
	
				setIdeationProjectData(generatedIdeas);
				setStep(step + 1);
			} catch (error) {
				console.error('Error generating ideas:', error);
				setIsLoading(false)
			} finally {
				setIsLoading(false); // Reset loading state
			}
		};
		generateIdeas();
	};
	
	const regenerateProjectIdeas = () => {
		setIsLoading(true); // Set loading state to true
		const generateIdeas = async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/api/chat`,
					{
						prompt: `Generate a list of 5 distinct project ideas given the category: ${option} and the issues: ${editedIssues}. Each idea should include a highly appropriate title with a creative name, a useful description, a highly accurate impact rating, a highly accurate feasibility rating, a highly accurate difficulty rating, and a list of 3 main features. The list should always be in the following format exactly: [{title: 'Virtual Classroom Enhancer', description: 'A tool to create interactive and engaging virtual classrooms with real-time collaboration features.', impact: 5, feasibility: 4, difficulty: 3, features: ['Real-time collaboration', 'Interactive quizzes', 'Virtual whiteboard']},{title: 'AI-Powered Tutoring Assistant', description: 'An AI-driven tutoring assistant that provides personalized help to students based on their learning progress.', impact: 4, feasibility: 3, difficulty: 4, features: ['Adaptive learning paths', 'Progress tracking', 'Automated feedback']},{title: 'Gamified Learning Platform', description: 'A platform that uses game mechanics to make remote learning more engaging and motivating for students.', impact: 4, feasibility: 3, difficulty: 3, features: ['Leaderboards', 'Achievement badges', 'Interactive challenges']},{title: 'Remote Lab Simulator', description: 'A simulator that allows students to conduct virtual lab experiments and gain hands-on experience remotely.', impact: 5, feasibility: 3, difficulty: 4, features: ['Virtual lab experiments', 'Real-time data analysis', 'Experiment tutorials']},{title: 'Collaborative Study Space', description: 'An online space where students can study together, share resources, and support each other's learning.', impact: 3, feasibility: 5, difficulty: 2, features: ['Shared resource library', 'Group study sessions', 'Peer support chat']}] Please generate the ideas. Never use new lines. Never end with period or comma`,
					}
				);
				console.log(response.data);
	
				let generatedIdeas = JSON.parse(
					response.data.response
						.replace(/([{,]\s*)(\w+):/g, '$1"$2":')
						.replace(/'/g, '"')
				);
	
				generatedIdeas = generatedIdeas.map((object) => ({
					...object,
					category: option,
				}));
	
				console.log(generatedIdeas);
	
				setIdeationProjectData(generatedIdeas);
			} catch (error) {
				console.error('Error regenerating ideas:', error);
			} finally {
				setIsLoading(false); // Reset loading state
			}
		};
		generateIdeas();
	};
	
	const backtrackStep = () => {
		setStep(step - 1);
	};

	const handleIconClick = (id) => {
		setIcons({
			...icons,
			[id]: icons[id] === add_active_icon ? add_inactive_icon : add_active_icon,
		});

		if (chosenIdeas.includes(ideationProjectData[id])) {
			console.log(ideationProjectData[id].title, "removed");
			setChosenIdeas(
				chosenIdeas.filter((idea) => idea !== ideationProjectData[id])
			);
		} else {
			console.log(ideationProjectData[id].title, "added");
			setChosenIdeas([...chosenIdeas, ideationProjectData[id]]);
		}
	};

	const renderModalContent = () => {
		if (isLoading === true) {
			return (
				<div className="loading-screen">
					<h2>Generating...</h2>
					<div className="progress-container">
						<div className="progress-bar-outer">
							<div className="progress-bar-inner"></div>
						</div>
					</div>
					{/* Add a spinner or animation here if desired */}
				</div>
			);
		}
	
		switch (step) {
			// When step is 0, go back to main modal
			case 0:
				return (
					<>
						<div className="ideation-project-user-info">
							<h2>Create Project Ideas</h2>
							<p>
								To generate project ideas, complete the following steps below:
							</p>
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
							<span>
								<p>
									2. Based on your chosen category, describe any issues you
									would like your project to address
								</p>
							</span>
							<div
								className="tooltip-container"
								onMouseEnter={() => setShowTooltip(true)}
								onMouseLeave={() => setShowTooltip(false)}
							>
								<img src={help_icon} alt="help icon" />
								{showTooltip && (
									<div className="tooltip-text">
										Struggling? Think and research any issues you observe within
										your local, school or other personal communities
									</div>
								)}
							</div>
							{/* Add respective items here */}
							<h2>Issues:</h2>
							{editedIssues.map((feature, index) => (
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
							<></>
							{/* Take user to main modal */}
							<div className="project-ideation-button-container">
								<button className="generate" onClick={addStep}>
									Generate
								</button>
								<button className="backtrack" onClick={closeModal}>
									Go Back
								</button>
							</div>
						</div>
						<img
							className="generate-projects-image"
							src={generate_projects_image}
							alt="Project Ideation Image"
						/>
					</>
				);
			// Base Case: User is on main project ideas section
			case 1:
				return (
					<>
						<div className="ideation-project-results">
							<h2>Results</h2>
							<p>
								Based on your responses, we believe the following project ideas
								may be best suited for you. To add an idea to your list, click
								the plus icon to the right of the project. <b>Scroll</b> down to
								see all generated ideas
							</p>

							{/* Generated Feature Results: */}
							<div className="ideation-project-all-results">
								{ideationProjectData.map((feature, index) => (
									<div key={index}>
										<div className="ideation-feature-result">
											<div className="ideation-feature-info">
												<h2>
													{index + 1}. {feature.title}
												</h2>
												<p>{feature.description}</p>
											</div>
											<img
												src={icons[index] || add_inactive_icon}
												alt="add-inactive-icon"
												onClick={() => handleIconClick(index)}
												style={{ cursor: "pointer" }}
											/>
										</div>
									</div>
								))}
							</div>

							{/* Modal Actions + Navigations */}
							<div className="project-ideation-button-container">
								<button className="generate" onClick={addProjectIdea}>
									Finish
								</button>
								<button className="generate" onClick={regenerateProjectIdeas}>
									Regenerate
								</button>
								<button className="backtrack" onClick={backtrackStep}>
									Go Back
								</button>
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
