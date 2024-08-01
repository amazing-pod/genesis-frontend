import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/backtrack_icon.png";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { formatDistanceToNow } from "date-fns";

const PostDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({});
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState(null);
	const { user } = useUser();

	useEffect(() => {
		const fetchPost = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads/${id}`
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

	const handleReplySubmit = (commentId, replyText) => {
		const createReply = async () => {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads`,
				{
					authorId: user.id,
					content: replyText,
					replyToId: commentId,
				}
			);
			console.log(response.data);
		};

		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return {
					...comment,
					replies: [
						...comment.replies,
						{
							id: comment.replies.length + 1,
							user: user.username,
							text: replyText,
							userProfilePhoto: user.imageUrl,
						},
					],
				};
			}
			return comment;
		});
		createReply();
		setComments(updatedComments);
		setReplyingTo(null);
	};

	const handleLikeClick = async () => {
		try {
			if (liked) {
				await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${post.id}/unlike/${user.id}`
				);
				setLikes(likes - 1);
			} else {
				await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${post.id}/like/${user.id}`
				);
				setLikes(likes + 1);
			}
			setLiked(!liked);
		} catch (error) {
			console.error("Error updating like status:", error);
		}
	};
	

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleCommentSubmit = (e) => {
		e.preventDefault();
		const createReply = async () => {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads`,
				{
					authorId: user.id,
					content: newComment,
					replyToId: id,
				}
			);
			console.log(response.data);
			const updatedComments = [...comments, response.data];
			setComments(updatedComments);
			setNewComment("");
		};

		if (newComment.trim()) {
			createReply();
		}
	};

	const handleCommentDelete = (commentId) => {
		setComments(comments.filter((comment) => comment.id !== commentId));
		const deleteComment = async () => {
			const response = await axios.delete(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads/${commentId}`
			);
			console.log(response.data);
		};
		deleteComment();
	};

	const handlePostDelete = (postId) => {
		const deletePost = async () => {
			const response = await axios.delete(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads/${postId}`
			);
			console.log(response.data);
		};
		deletePost();
		navigate("/community");
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
								<p>{post.author?.username || "default-username"}</p>
							</div>
							<p>
								{/* {formatDistanceToNow(post.createdAt, {
									addSuffix: true,
								}).replace("about ", "")} */}
								{post.updatedAt}
							</p>
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
							{post.author?.id === user.id && (
								<img
									className="delete-icon"
									src={delete_icon}
									alt="Delete Post"
									onClick={() => handlePostDelete(post.id)}
								/>
							)}
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
											className="user-profile-photo"
											src={
												comment.deleted
													? "https://placehold.co/50"
													: comment.author?.profile?.picture
											}
											alt="user profile photo"
										/>
										<h3>
											{comment.deleted ? "[deleted]" : comment.author?.username}
										</h3>
									</div>
									<p>{comment.content}</p>
									{!comment.deleted && comment.author?.id === user.id && (
										<img
											className="delete-icon"
											src={delete_icon}
											alt="Delete Comment"
											onClick={() => handleCommentDelete(comment.id)}
										/>
									)}
									<button
										className="reply-button"
										onClick={() => setReplyingTo(comment.id)}
									>
										Reply
									</button>
									{replyingTo === comment.id && (
										<ReplyForm
											commentId={comment.id}
											onReplySubmit={handleReplySubmit}
											onCancel={() => setReplyingTo(null)}
										/>
									)}
									<hr />
									<div className="replies">
										{comment.replies &&
											comment.replies.map((reply) => (
												<div className="reply" key={reply.id}>
													<div className="user-reply-header">
														<img
															src={reply.author?.profile?.picture}
															alt="user profile photo"
														/>
														<h4>{reply.author?.username}</h4>
													</div>
													<p>{reply.content}</p>
													{reply.author?.id === user.id && (
														<img
															className="delete-icon"
															src={delete_icon}
															alt="Delete Reply"
															onClick={() => handleCommentDelete(comment.id)}
														/>
													)}
												</div>
											))}
									</div>
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
