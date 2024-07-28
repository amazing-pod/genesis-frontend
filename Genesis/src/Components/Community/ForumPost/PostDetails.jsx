import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/backtrack_icon.png";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const PostDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({});
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const { user } = useUser();

	useEffect(() => {
		const fetchPost = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_DEV_URL}/threads/${id}`
			);
			console.log(response.data);
			setPost(response.data);
			setComments(response.data.replies);
			setLikes(response.data.likeCount);
			setLiked(
				response.data.likedBy.find((liker) => liker.id === user.id)
					? true
					: false
			);
		};
		if (user) {
			fetchPost();
		}
	}, [id, user]);

	const handleLikeClick = () => {
		setLikes(liked ? likes - 1 : likes + 1);
		setLiked(!liked);
	};

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		if (newComment.trim()) {
			const updatedComments = [
				...comments,
				{
					user: "CurrentUser",
					text: newComment,
					userProfilePhoto: "https://placehold.co/50x50",
					id: comments.length + 1,
				},
			];
			setComments(updatedComments);
			setNewComment("");
		}
	};

	const handleCommentDelete = (commentId) => {
		setComments(comments.filter((comment) => comment.id !== commentId));
	};

	const handleBackClick = () => {
		navigate("/community");
	};

	return (
		<div className="post-detail-container">
			<div className="post-items">
				{/* "Go back text", where a user returns back to the community page */}
				<span className="post-backtrack">
					<img
						src={back_icon}
						alt="Back"
						className="back-icon"
						onClick={handleBackClick}
					/>
					<h2>Go Back</h2>
				</span>
				<div className="post-content">
					<div className="post-details">
						<h2>{post.title}</h2>
						<hr />
						{/* Post content */}
						<div className="post-user-info">
							<div className="post-user-profile">
								<img
									className="user-profile-photo"
									src={post.author?.profile?.picture || "default-image-url"}
									alt="user profile photo"
								/>
								<p>{post.author?.username || "default-image-url"}</p>
							</div>
							<p>{post.createdAt}</p>
						</div>
						<p>{post.content}</p>
						{/* Post Interactions: likes and comments */}
						<div className="post-interactions">
							<p>{likes}</p>
							<img
								onClick={handleLikeClick}
								className="forum-icon"
								src={liked ? upvote_active_icon : upvote_inactive_icon}
								alt="upvote status"
							/>
							<p>{comments.length}</p>
							<img
								className="forum-icon"
								src={message_icon}
								alt="Message Icon"
							/>
						</div>
					</div>
					{/* If the user made the post, put a delete button here */}
					<div className="post-separator"></div>
					<div className="post-details">
						<h2>Discussion</h2>
						<hr />
						{/* Comments Section */}
						<div className="comments-section">
							{comments.map((comment, index) => (
								<div className="comment" key={index}>
									<div className="user-comment-header">
										<img
											src={comment.author.profile.picture}
											alt="user profile photo"
										/>
										<h3>{comment.author.username}</h3>
									</div>
									<p>{comment.content}</p>
									{comment.user === "CurrentUser" && (
										<img
											className="delete-icon"
											src={delete_icon}
											alt="Delete Comment"
											onClick={() => handleCommentDelete(comment.id)}
										/>
									)}
									<hr />
								</div>
							))}
							<form className="comment-form" onSubmit={handleCommentSubmit}>
								<textarea
									value={newComment}
									onChange={handleCommentChange}
									placeholder="Reply..."
									required
								/>
								<button type="submit">Post Comment</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostDetails;
