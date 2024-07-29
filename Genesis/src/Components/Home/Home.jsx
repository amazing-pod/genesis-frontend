import React, { useState, useEffect } from "react";
import "./Home.css";
// Component Imports
import Header from "../Shared/Header/Header";
import MiniIdeaCard from "./MiniIdeaCard/MiniIdeaCard";
import IdeaCard from "../Brainstorm/IdeaCard/IdeaCard";
import MiniPostCard from "./MiniPostCard/MiniPostCard";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const Home = () => {
	const { user } = useUser();

	// Gathering all relevant data from brainstorm page:
	const [mostFeasibleIdea, setMostFeasibleIdea] = useState('');
	const [easiestIdea, setEasiestIdea] = useState('');
	const [mostDifficultIdea, setMostDifficultIdea] = useState('');
	const [mostImpactfulIdea, setMostImpactfulIdea] = useState('');
	const [bookmarkedIdeas, setBookmarkedIdeas] = useState([]);
	// Gathering all relevant data from community page (2 most recent posts):
	const [mostRecentPosts, setMostRecentPosts] = useState([]);

	// useEffect(() => {
	// 	useEffect(() => {
	// 	const fetchIdeas = async () => {
	// 		// Testing getting most feasible idea
	// 		const response = await axios.get(
	// 			`${import.meta.env.VITE_GENESIS_API_DEV_URL}/project/${user.id}/mostFeasible`
	// 		);
	// 		console.log(response.data);
			
	// 	};
	// 	fetchIdeas();
	// }, []);

	// 	// const fetchAllData = async () => {
	// 	// 	const feasibleIdeaResponse = await axios.get()
	// 	// }
	// })

	const [ideas, setIdeas] = useState([]);
	useEffect(() => {
		// Set Bookmarked Ideas
		const fetchIdeas = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_DEV_URL}/projects/project/${user.id}/bookmarkedIdeas`
			);
			console.log(response.data);
			setIdeas(response.data.ideas);
		};
		fetchIdeas();
	}, []);


	return (
		<>
			<Header />
			<div className="home-page-container">
				{/* Sidebar Items */}
				<div className="home-sidebar-container">
					<h3>Idea Highlights</h3>
					<hr />
					<div className="mini-idea-container">
						<MiniIdeaCard />
						<MiniIdeaCard />
						<MiniIdeaCard />
						<MiniIdeaCard />
					</div>
				</div>

				{/* Main Content */}
				<div className="home-main-content-container">
					<div className="home-main-content">
						<h2>
							Hello, <b>{user.username}</b>.
						</h2>
						<p>
							Welcome back. Here, you can find a quick summary of your
							bookmarked and standout-ideas, while staying up to date with the
							newest forum posts
						</p>
						<h3>Bookmarked Ideas</h3>
						<hr />
						<div className="bookmark-card-container">
						<div className="bookmark-main-container">
							{ideas && ideas.length > 0 ? (
								ideas.map((idea) => (
									<IdeaCard
										key={idea.id}
										id={idea.id}
										title={idea.title}
										description={idea.description}
										projectFeatures={idea.projectFeatures}
										dayGenerated={idea.dayGenerated}
										impact={idea.impact}
										feasibility={idea.feasibility}
										difficulty={idea.difficulty}
										category={idea.category}
										bookmarked={idea.bookmarked}
									/>
								))
							) : (
								<p>No bookmarked ideas available.</p>
							)}
						</div>

						</div>
						<h3>New Posts</h3>
						<hr />
						<div className="recent-post-container">
							<MiniPostCard />
							<MiniPostCard />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
