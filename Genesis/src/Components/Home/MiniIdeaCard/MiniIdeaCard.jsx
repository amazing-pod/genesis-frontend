import React from "react";
import "./MiniIdeaCard.css";

const MiniIdeaCard = ({ title, name, description }) => {
	// console.log("IDEA DATA:");
	// console.log(ideaData);
	return (
		<>
			<div className="mini-idea-card-container">
				<div className="mini-idea-header">
					<h3>{title}</h3>
				</div>
				<div className="mini-idea-body">
					<h3>{name}</h3>
					<p>{description}</p>
				</div>
			</div>
		</>
	);
};

export default MiniIdeaCard;
