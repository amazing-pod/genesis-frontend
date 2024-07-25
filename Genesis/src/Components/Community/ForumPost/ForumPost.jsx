import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import "./ForumPost.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import axios from "axios";

const ForumPost = ({ post }) => {
	const navigate = useNavigate();
	const { user } = useUser();

	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		setLikes(post.likeCount);
		setLiked(post.likedBy.find((liker) => liker.id === user.id) ? true : false);
	}, []);

	const handleLikeClick = async (event) => {
		event.stopPropagation(); // Prevents navigating to the post when liking
		setLikes(liked ? likes - 1 : likes + 1);
		setLiked(!liked);
		if (liked) {
			await axios.put(
				`${import.meta.env.VITE_GENESIS_API_PROD_URL}/threads/${
					post.id
				}/unlike/${user.id}`
			);
		} else {
			await axios.put(
				`${import.meta.env.VITE_GENESIS_API_PROD_URL}/threads/${post.id}/like/${
					user.id
				}`
			);
		}
	};

	const handlePostClick = () => {
		navigate(`/community/post/${post.id}`); // Navigate to the post details page
	};

	return (
		<div className="forum-post-container" onClick={handlePostClick}>
			{/* Forum post header */}
			<div className="forum-post-header">
				<div className="forum-user-profile">
					<img
						className="user-profile-photo"
						src={post.author.profile.picture}
						alt="User profile photo"
					/>
					<p className="forum-post-username">{post.author.username}</p>
				</div>
				<p>{post.createdAt}</p>
			</div>
			{/* Main content */}
			<div className="forum-content">
				<h4>{post.title}</h4>
				<p>{post.content}</p>
				{/* Post Interactions: Likes and Messages */}
				<div className="post-interactions">
					<p>{post.likeCount}</p>
					<img
						onClick={handleLikeClick}
						className="forum-icon"
						src={liked ? upvote_active_icon : upvote_inactive_icon}
						alt="upvote status"
					/>
					<p>{post.likedBy.length}</p>
					<img className="forum-icon" src={message_icon} alt="Message Icon" />
				</div>
			</div>
		</div>
	);
};

export default ForumPost;
