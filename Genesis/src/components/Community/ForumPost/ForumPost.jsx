import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import "./ForumPost.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const ForumPost = ({ post }) => {
	console.log("Post info:", post);
	const [likes, setLikes] = useState(post.likeCount);
	const [liked, setLiked] = useState(false);
	const navigate = useNavigate();
	const notify = () => toast("Thank you for liking a post");
	const { user } = useUser();

	useEffect(() => {
		setLikes(post.likeCount);
		setLiked(post.likedBy.find((liker) => liker.id === user.id) ? true : false);
	}, []);

	const handleLikeClick = async (event) => {
		event.stopPropagation(); // Prevents navigating to the post when liking
		if (liked) {
			if (likes > 0) { // Check to prevent decrementing into negative values
				setLikes(likes - 1);
				await axios.put(
					`${import.meta.env.VITE_GENESIS_API_DEV_URL}/threads/${post.id}/unlike/${user.id}`
				);
			}
		} else {
			setLikes(likes + 1);
			await axios.put(
				`${import.meta.env.VITE_GENESIS_API_DEV_URL}/threads/${post.id}/like/${user.id}`
			);
		}
		setLiked(!liked);
		notify();
	};
	
	const handlePostClick = () => {
		navigate(`/community/threads/${post.id}`); // Navigate to the post details page
	};

	return (
		<div className="forum-post-container" onClick={handlePostClick}>
			{/* Forum post header */}
			<div className="forum-post-header">
				<div className="forum-user-profile">
					<img
						className="user-profile-photo"
						src={post?.author?.profile?.picture || 'https://placehold.co/50x50'}
						alt="User profile photo"
					/>
					<p className="forum-post-username">{post?.author?.username}</p>
				</div>
				<p>
					{formatDistanceToNow(post.createdAt, { addSuffix: true }).replace(
						"about ",
						""
					)}
				</p>
			</div>
			{/* Main content */}
			<div className="forum-content">
				<h4>{post.title}</h4>
				<p>{post.content}</p>
				{/* Post Interactions: Likes and Messages */}
				<div className="post-interactions">
					<p>{likes}</p>
					<img
						onClick={handleLikeClick}
						className="forum-icon"
						src={liked ? upvote_active_icon : upvote_inactive_icon}
						alt="upvote status"
					/>
					<p>{(post.replies || []).length}</p>
					<img className="forum-icon" src={message_icon} alt="Message Icon" />
				</div>
				{/* Tags */}
				<div className="post-tags">
					{(post.tags || []).map((tag, index) => (
						<button key={index} className="tag-button">
							{tag.name}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default ForumPost;
