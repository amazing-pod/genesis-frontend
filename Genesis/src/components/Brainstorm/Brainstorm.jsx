import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Brainstorm.css";
import dropdown_icon from "../../assets/png/dropdown_icon.png";
// Components
import Header from "../Shared/Header/Header";
import IdeaCard from "./IdeaCard/IdeaCard";
import ViewIdeaModal from "./ViewIdeaModal/ViewIdeaModal";
import IdeationModal from "./IdeationModal/IdeationModal";
import { DropdownProvider } from "../../context/DropdownContext";
import { useProject } from "../../context/ProjectContext";
import { useUser } from "@clerk/clerk-react";
import { useIdeas } from "../../context/IdeasContext";

const Brainstorm = () => {
	const [ideaDummyData, setIdeaDummyData] = useState([
		{
			id: 1,
			title: "Smart Home Automation",
			description:
				"Automate various home devices and appliances using IoT technology.",
			projectFeatures: [
				"Motion detection lights",
				"Temperature control",
				"Smart locks",
			],
			dayGenerated: "2023-07-15",
			impact: 4,
			feasibility: 3,
			difficulty: 2,
			category: "Technology",
			bookmarked: false,
		},
		{
			id: 2,
			title: "Community Garden Initiative",
			description:
				"Create a community garden to promote sustainable living and local food production.",
			projectFeatures: [
				"Raised beds",
				"Compost station",
				"Education workshops",
			],
			dayGenerated: "2023-07-14",
			impact: 5,
			feasibility: 4,
			difficulty: 3,
			category: "Environment",
			bookmarked: true,
		},
		{
			id: 3,
			title: "Mobile App for Senior Citizens",
			description:
				"Develop an intuitive mobile app catering to the needs of elderly people.",
			projectFeatures: [
				"Large font size",
				"Voice navigation",
				"Emergency contacts",
			],
			dayGenerated: "2023-07-13",
			impact: 3,
			feasibility: 5,
			difficulty: 2,
			category: "Technology",
			bookmarked: false,
		},
		{
			id: 4,
			title: "Online Learning Platform",
			description:
				"Build a platform offering courses and tutorials in various subjects.",
			projectFeatures: [
				"Video lectures",
				"Interactive quizzes",
				"Progress tracking",
			],
			dayGenerated: "2023-07-12",
			impact: 4,
			feasibility: 4,
			difficulty: 3,
			category: "Education",
			bookmarked: true,
		},
		{
			id: 5,
			title: "Local Artisan Marketplace",
			description:
				"Create an online marketplace to support local artisans and craftsmen.",
			projectFeatures: [
				"Seller profiles",
				"Product listings",
				"Secure payment gateway",
			],
			dayGenerated: "2023-07-11",
			impact: 3,
			feasibility: 4,
			difficulty: 2,
			category: "Commerce",
			bookmarked: false,
		},
		{
			id: 6,
			title: "Green Energy Solutions",
			description:
				"Implement renewable energy solutions to reduce carbon footprint in urban areas.",
			projectFeatures: [
				"Solar panel installations",
				"Wind turbine farms",
				"Energy-efficient buildings",
			],
			dayGenerated: "2023-07-10",
			impact: 5,
			feasibility: 3,
			difficulty: 4,
			category: "Environment",
			bookmarked: true,
		},
	]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [filter, setFilter] = useState("Newest");
	const [sortedIdeas, setSortedIdeas] = useState([]);
	const [selectedIdea, setSelectedIdea] = useState(null);
	const [openIdeationModal, setOpenIdeationModal] = useState(false);
	const { ideas, setIdeas } = useIdeas();
	const { user } = useUser();
	const { project, setProject } = useProject();

	useEffect(() => {

		const doAll = async () => {
			let projectId = "";

			const response1 = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_URL}/projects/owner/${user.id}`
			);

			if (response1.data.length) {
				projectId = response1.data[0].id;
				setProject(response1.data[0].id);
			} else {
				const response2 = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/projects`,
					{ ownerId: user.id, title: "default" }
				);
				projectId = response2.data.id;
				setProject(response2.data.id);
			}

			setProject(projectId);

			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_URL}/projects/${projectId}`
			);
			setIdeas(response.data.ideas);
		};
		doAll();
	}, []);

	const toggleDropdown = () => {
		setDropdownOpen((prev) => !prev);
	};

	const handleDropdownItemClick = (filterName) => {
		setFilter(filterName);
		setDropdownOpen(false);
		sortIdeas(filterName);
	};

	const handleOutsideClick = (event) => {
		if (!event.target.closest(".brainstorm-mini-dropdown") && dropdownOpen) {
			setDropdownOpen(false);
		}
	};

	useEffect(() => {
		window.addEventListener("click", handleOutsideClick);
		return () => {
			window.removeEventListener("click", handleOutsideClick);
		};
	}, [dropdownOpen]);

	useEffect(() => {
		sortIdeas(filter);
	}, [filter, ideas]);

	const sortIdeas = (filter) => {
		let sorted = [...ideas];
		if (filter === "Oldest") {
			sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
		} else if (filter === "Newest") {
			sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		} else if (filter === "Bookmarked") {
			sorted.sort((a, b) => {
				if (a.bookmarked === b.bookmarked) {
					return 0;
				}
				return a.bookmarked ? -1 : 1;
			});
		}
		setSortedIdeas(sorted);
	};

	const toggleIdeationModal = () => {
		setOpenIdeationModal((prev) => !prev);
	};

	const openModalForId = (ideaId) => {
		setSelectedIdea(ideaId);
	};

	const closeModal = () => {
		setSelectedIdea(null);
	};

	const handleSave = (updatedIdea) => {
		const updatedIdeas = ideas.map((idea) =>
			idea.id === updatedIdea.id ? updatedIdea : idea
		);
		setIdeas(updatedIdeas);
		closeModal();
	};

	return (
		<>
			<Header />
			<div className="user-idea-container">
				<div className="mini-navbar">
					<div className="brainstorm-mini-dropdown">
						<button onClick={toggleDropdown} className="brainstorm-dropbtn">
							{filter}
							<img
								className="dropdown-icon"
								src={dropdown_icon}
								alt="dropdown icon"
							/>
						</button>
						<div
							className={`dropdown-brainstorm-content ${
								dropdownOpen ? "show" : ""
							}`}
						>
							<p onClick={() => handleDropdownItemClick("Newest")}>Newest</p>
							<p onClick={() => handleDropdownItemClick("Oldest")}>Oldest</p>
							<p onClick={() => handleDropdownItemClick("Bookmarked")}>
								Bookmarked
							</p>
						</div>
					</div>
					<p className="new-post" onClick={toggleIdeationModal}>
						Add/Generate Ideas +
					</p>
				</div>
				{selectedIdea !== null && (
					<ViewIdeaModal
						idea={ideas.find((idea) => idea.id === selectedIdea)}
						closeModal={closeModal}
						onSave={handleSave}
					/>
				)}
				<h2>My Ideas</h2>
				<hr />
				{openIdeationModal && (
					<IdeationModal closeModal={toggleIdeationModal} />
				)}
				<div className="idea-card-container">
					{sortedIdeas.map((idea) => (
						<IdeaCard
							key={idea.id}
							id={idea.id}
							title={idea.title}
							description={idea.description}
							projectFeatures={idea.projectFeatures}
							dayGenerated={idea.createdAt}
							impact={idea.impact}
							feasibility={idea.feasibility}
							difficulty={idea.difficulty}
							category={idea.category}
							bookmarked={idea.bookmarked}
							openModal={openModalForId}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default Brainstorm;
