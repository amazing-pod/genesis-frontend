import React, { useState, useEffect } from "react";
import "./MiniPostCard.css";
import profile_photo from "../../../assets/png/profile_photo.png";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Should take in a title, content, like count,
const MiniPostCard = ({
	id,
	title,
	description,
	likeCount,
	likedBy,
	profilePicture,
}) => {
	const [likes, setLikes] = useState(likeCount);
	const [liked, setLiked] = useState(false);
	const { user } = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		setLiked(likedBy.some((liker) => liker.id === user.id));
	}, [user.id]);

	const handlePostClick = () => {
		navigate(`/community/threads/${id}`); // Navigate to the post details page
	};

	const handleLikeClick = async (event) => {
		event.stopPropagation(); // Prevents navigating to the post when liking

		try {
			if (liked) {
				const response = await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${id}/unlike/${
						user.id
					}`
				);
				setLikes(likes - 1);
			} else {
				const response = await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${id}/like/${
						user.id
					}`
				);
				setLikes(likes + 1);
			}
			setLiked(!liked);
		} catch (error) {
			console.error("Error updating like status:", error);
		}
	};

	return (
		<>
			<div className="mini-post-card-container" onClick={handlePostClick}>
				{/* Post Header */}
				<div className="mini-post-header">
					<h3>{title}</h3>
					<img
						className="mini-user-profile-photo"
						src={profilePicture || profile_photo}
						alt="user profile photo"
					/>
				</div>
				{/* Post Info/Body */}
				<div className="mini-post-body">
					<p>{description}</p>
				</div>
				{/* Post Interactions: Likes and Messages */}
				<div className="mini-post-interactions">
					<p>{likes}</p>
					<img
						onClick={handleLikeClick}
						className="forum-icon"
						src={liked ? upvote_active_icon : upvote_inactive_icon}
						alt="upvote status"
					/>
					{/* <p>5</p>
          <img className="forum-icon" src={message_icon} alt="Message Icon" /> */}
				</div>

				{/* <div className="post-interactions">
            <p>{likes}</p>
            <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
            <p>{post.comments.length}</p>
            <img className="forum-icon" src={message_icon} alt="Message Icon" />
          </div> */}
			</div>
		</>
	);
};

export default MiniPostCard;
