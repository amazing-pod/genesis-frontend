import React, { useState } from "react";
import "./IdeaCard.css";
import bookmark_inactive_icon from "../../../assets/png/bookmark_inactive.png";
import bookmark_active_icon from "../../../assets/png/bookmark_active.png";
import axios from "axios";
import { useProject } from "../../../context/ProjectContext";

const IdeaCard = ({
	id,
	title,
	description,
	projectFeatures,
	impact,
	feasibility,
	difficulty,
	category,
	bookmarked,
	openModal,
}) => {
	const [bookmarkToggle, setBookmarkToggle] = useState(bookmarked);
	const tagClass = `${category.toLowerCase()}-tag`;
	const { project } = useProject();

	let ratingGenerator = (rating) => {
		let result = [];
		for (let i = 0; i < 5; i++) {
			result.push(i < rating ? "circle-active" : "circle-empty");
		}
		return result;
	};

	const feasibilityArray = ratingGenerator(feasibility);
	const impactArray = ratingGenerator(impact);
	const difficultyArray = ratingGenerator(difficulty);

	const handleClick = (event) => {
		// Don't open modal if user clicks on bookmark icon
		if (!event.target.classList.contains("bookmark-icon")) {
			openModal(id);
		}
	};

	const handleBookmark = () => {
		setBookmarkToggle(!bookmarkToggle);

		const bookmarkIdea = async () => {
			const response = await axios.put(
				`${
					import.meta.env.VITE_GENESIS_API_DEV_URL
				}/projects/${project}/ideas/${id}`
			);
			console.log(response.data);
		};
		bookmarkIdea();
	};

	return (
		<div className="idea-card" onClick={handleClick}>
			<div className="idea-header">
				<h3>{title}</h3>
			</div>
			<h3>Description</h3>
			<p className="idea-description">{description}</p>

			<div className="idea-rating-container">
				<div className="idea-rating">
					<p>Impact</p>
					<div className="rating-circles">
						{impactArray.map((rating, index) => (
							<div key={index} className={rating}></div>
						))}
					</div>
				</div>

				<div className="idea-rating">
					<p>Feasibility</p>
					<div className="rating-circles">
						{feasibilityArray.map((rating, index) => (
							<div key={index} className={rating}></div>
						))}
					</div>
				</div>

				<div className="idea-rating">
					<p>Difficulty</p>
					<div className="rating-circles">
						{difficultyArray.map((rating, index) => (
							<div key={index} className={rating}></div>
						))}
					</div>
				</div>

				<div className="idea-extra-info">
					<div className={tagClass}>{category}</div>
					<img
						className="bookmark-icon"
						onClick={handleBookmark}
						src={bookmarkToggle ? bookmark_active_icon : bookmark_inactive_icon}
						alt="Bookmark status"
					/>
				</div>
			</div>
		</div>
	);
};

export default IdeaCard;
