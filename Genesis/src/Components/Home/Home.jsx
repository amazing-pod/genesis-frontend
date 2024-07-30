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

	const [bookmarkedIdeas, setBookmarkedIdeas] = useState([]);
	const [mostRecentPosts, setMostRecentPosts] = useState([]);
	const [mostFeasibleIdea, setMostFeasibleIdea] = useState({});
	const [easiestIdea, setEasiestIdea] = useState({});
	const [mostDifficultIdea, setMostDifficultIdea] = useState({});
	const [mostImpactfulIdea, setMostImpactfulIdea] = useState({});
	useEffect(() => {
		const fetchHomeData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_GENESIS_API_DEV_URL}/projects/project/${user.id}/homeData`
				);
				console.log(response.data);

				const data = response.data;
				// Log each data item before setting the state
				const bookmarkedIdeasData = data.find(item => item.bookmarkedIdeas) ? data.find(item => item.bookmarkedIdeas).bookmarkedIdeas : [];
				console.log("Bookmarked Ideas:", bookmarkedIdeasData);
				setBookmarkedIdeas(bookmarkedIdeasData);

				const mostRecentPostsData = data.find(item => item.mostRecentPosts) ? data.find(item => item.mostRecentPosts).mostRecentPosts : [];
				console.log("Most Recent Posts:", mostRecentPostsData);
				setMostRecentPosts(mostRecentPostsData);

				const mostFeasibleIdeaData = data.find(item => item.mostFeasibleIdea) ? data.find(item => item.mostFeasibleIdea).mostFeasibleIdea : {};
				console.log("Most Feasible Idea:", mostFeasibleIdeaData);
				setMostFeasibleIdea(mostFeasibleIdeaData);

				const easiestIdeaData = data.find(item => item.easiestIdea) ? data.find(item => item.easiestIdea).easiestIdea : {};
				console.log("Easiest Idea:", easiestIdeaData);
				setEasiestIdea(easiestIdeaData);

				const mostDifficultIdeaData = data.find(item => item.mostDifficulIdea) ? data.find(item => item.mostDifficulIdea).mostDifficulIdea : {};
				console.log("Most Difficult Idea:", mostDifficultIdeaData);
				setMostDifficultIdea(mostDifficultIdeaData);

				const mostImpactfulIdeaData = data.find(item => item.mostImpactfulIdea) ? data.find(item => item.mostImpactfulIdea).mostImpactfulIdea : {};
				console.log("Most Impactful Idea:", mostImpactfulIdeaData);
				setMostImpactfulIdea(mostImpactfulIdeaData);

				setReplies()
			} catch (error) {
				console.error("Error fetching home data:", error);
			}
		};
	
		fetchHomeData();
	}, [user.id]);
	


	return (
		<>
		<Header />
		<div className="home-page-container">
			{/* Sidebar Items */}
			<div className="home-sidebar-container">
				<h3>Idea Highlights</h3>
				<hr />
				<div className="mini-idea-container">
				{/* Display Most Feasible Idea */}
					{ mostFeasibleIdea.length > 0 ? (
						<MiniIdeaCard title="Most Feasible Idea" name={mostFeasibleIdea.title} description={mostFeasibleIdea.description}/>
					) : (
						<></>
					) 
					}
					
					{/* Easiest Idea */}
					{ easiestIdea.length > 0 ? (
						<MiniIdeaCard title="Easiest Idea" name={easiestIdea.title} description={easiestIdea.description}/>
					) : (
						<></>
					) 
					}

					{/* Most Difficult Idea */}
					{ mostDifficultIdea.length > 0 ? (
						<MiniIdeaCard title="Most Difficult Idea" name={mostDifficultIdea.title} description={mostDifficultIdea.description}/>
					) : (
						<></>
					) 
					}

					{/* Most Impactful Idea */}
					{ mostImpactfulIdea.length > 0 ? (
						<MiniIdeaCard title="Most Impactful Idea" name={mostImpactfulIdea.title} description={mostImpactfulIdea.description}/>
					) : (
						<></>
					) 
					}
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
						newest forum posts.
					</p>
					<h3>Bookmarked Ideas</h3>
					<hr />
					<div className="bookmark-card-container">
						<div className="bookmark-main-container">
							{bookmarkedIdeas.length > 0 ? (
								bookmarkedIdeas.map((idea) => (
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
						{
						mostRecentPosts.length > 0 ? (
							mostRecentPosts.map((post) => (
								<MiniPostCard
									key={post.id}
									title={post.title}
									description={post.content}
									likeCount={post.likeCount}
									profilePicture={post.author.profile.picture}
									replyCount={post.replies ? post.replies.length : 0}
								/>
							))
						) : (
							<p>No recent posts available.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	</>
);
};

export default Home;
