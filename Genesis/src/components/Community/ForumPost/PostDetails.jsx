import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/backtrack_icon.png";
import default_profile_icon from "../../../assets/png/default_profile.png";
import ReplyForm from "./ReplyForm";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { formatDistanceToNow, parseISO } from "date-fns";

const PostDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState({});
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [replyingTo, setReplyingTo] = useState(null);
	const [replyUsers, setReplyUsers] = useState({});
	const { user } = useUser();

	useEffect(() => {
		const fetchPost = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${id}`
				);
				console.log("Fetched post data:", response.data);
				setPost(response.data);
				setComments(response.data.replies);
				setLikes(response.data.likedBy.length);
				setLiked(
					response.data.likedBy.find((liker) => liker.id === user.id)
						? true
						: false
				);
				const users = await Promise.all(
					response.data.replies.map(async (reply) => {
						const userResponse = await axios.get(
							`${import.meta.env.VITE_GENESIS_API_URL}/users/id/${
								reply.authorId
							}`
						);
						return { [reply.authorId]: userResponse.data };
					})
				);
				const userMap = Object.assign({}, ...users);
				setReplyUsers(userMap);
			} catch (error) {
				console.error("Error fetching post data:", error);
			}
		};
		if (user) {
			fetchPost();
		}
	}, [id, user]);

	const handleReplySubmit = (commentId, replyText) => {
		const createReply = async () => {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads`,
					{
						authorId: user.id,
						content: replyText,
						replyToId: commentId,
					}
				);
				console.log("Created reply response:", response.data);
				const updatedComments = comments.map((comment) => {
					if (comment.id === commentId) {
						return {
							...comment,
							replies: [...comment.replies, response.data],
						};
					}
					return comment;
				});
				setComments(updatedComments);
				setReplyingTo(null);
			} catch (error) {
				console.error("Error creating reply:", error);
			}
		};

		createReply();
	};

	const handleLikeClick = async () => {
		try {
			if (liked) {
				const response = await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${post.id}/unlike/${
						user.id
					}`
				);
				console.log("Unlike response:", response.data);
				setLikes(likes - 1);
			} else {
				const response = await axios.put(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${post.id}/like/${
						user.id
					}`
				);
				console.log("Like response:", response.data);
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
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads`,
					{
						authorId: user.id,
						content: newComment,
						replyToId: id,
					}
				);
				console.log("Created comment response:", response.data);
				const updatedComments = [...comments, response.data];
				setComments(updatedComments);
				setNewComment("");
			} catch (error) {
				console.error("Error creating comment:", error);
			}
		};

		if (newComment.trim()) {
			createReply();
		}
	};

	const handleCommentDelete = (commentId) => {
		const updatedComments = comments.map((comment) => {
			if (comment.id === commentId) {
				return { ...comment, deleted: true };
			}
			return comment;
		});
		setComments(updatedComments);
		const deleteComment = async () => {
			try {
				const response = await axios.delete(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/${commentId}`,
					{ deleted: true }
				);
				console.log("Marked comment as deleted:", response.data);
			} catch (error) {
				console.error("Error marking comment as deleted:", error);
			}
		};
		deleteComment();
	};

	const handleReplyDelete = async (commentId, replyId) => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads/${replyId}`,
				{ deleted: true }
			);
			console.log("Deleted reply:", replyId);
			const updatedComments = comments.map((comment) => {
				if (comment.id === commentId) {
					return {
						...comment,
						replies: comment.replies.filter((reply) => reply.id !== replyId),
					};
				}
				return comment;
			});
			setComments(updatedComments);
		} catch (error) {
			console.error("Error deleting reply:", error);
		}
	};

	const handlePostDelete = async (postId) => {
		try {
			const response = await axios.delete(
				`${import.meta.env.VITE_GENESIS_API_URL}/threads/${postId}`
			);
			console.log("Deleted post response:", response.data);
			navigate("/community");
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	const handleBackClick = () => {
		navigate("/community");
	};

	return (
		<div className="post-detail-container">
			<div className="post-items">
				{/* Navigate back to community page */}
				<div className="post-backtrack-container">
					<span className="post-backtrack" onClick={handleBackClick}>
						<img src={back_icon} alt="Back" className="back-icon" />
						<h2>Go Back</h2>
					</span>
				</div>

				<div className="post-content">
					<div className="post-details">
						<h2>{post.title}</h2>
						<hr />
						<div className="post-user-info">
							<div className="post-user-profile">
								<img
									className="user-profile-photo"
									src={post.author?.profile?.picture || "default-image-url"}
									alt="user profile photo"
								/>
								<p>{post.author?.username || "default-username"}</p>
							</div>
							{post.createdAt
								? formatDistanceToNow(parseISO(post.createdAt), {
										addSuffix: true,
								  }).replace("about ", "")
								: "Date unavailable"}
						</div>
						<p>{post.content}</p>
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
							{/* {post.author?.id === user.id && (
                                <>
                                <button>a</button>
                                <img
                                    className="delete-icon"
                                    src={delete_icon}
                                    alt="Delete Post"
                                    onClick={() => handlePostDelete(post.id)}
                                />
                                </>
                            )} */}
						</div>
					</div>
					<div className="post-separator">
						{/* User can delete their own post if they are the author */}
						{post.author?.id === user.id && (
							<button
								className="forum-delete"
								onClick={() => handlePostDelete(post.id)}
							>
								Delete
							</button>
						)}
					</div>
					{/* Comments and replies to post */}
					<div className="comment-details-header">
						<h2>Discussion</h2>
						<hr />
					</div>

					<div>
						<div className="comments-section">
							{comments.map((comment) => (
								<div className="comment" key={comment.id}>
									<div className="comment-content">
										<div className="user-comment-header">
											<img
												className="user-profile-photo"
												src={
													comment.deleted
														? default_profile_icon
														: comment.author?.profile?.picture
												}
												alt="user profile photo"
											/>
											<h3>
												{comment.deleted
													? "[deleted]"
													: comment.author?.username}
											</h3>
											<button
												className="reply-button"
												onClick={() => setReplyingTo(comment.id)}
											>
												Reply
											</button>
										</div>
										<p>
											{comment.deleted
												? "[This comment has been deleted]"
												: comment.content}
										</p>
										{!comment.deleted && comment.author?.id === user.id && (
											<img
												className="delete-icon"
												src={delete_icon}
												alt="Delete Comment"
												onClick={() => handleCommentDelete(comment.id)}
											/>
										)}

										{replyingTo === comment.id && (
											<ReplyForm
												commentId={comment.id}
												onReplySubmit={handleReplySubmit}
												onCancel={() => setReplyingTo(null)}
											/>
										)}
										{/* Display Replies if there are any */}
										{comment.replies && comment.replies.length != 0 ? (
											<>
												<h2>Replies:</h2>
												<div className="reply-hr-container">
													<hr className="reply-div" />
												</div>
											</>
										) : null}

										<div className="community-replies">
											{comment.replies &&
												comment.replies.map((reply) => {
													const userProfile = replyUsers[reply.authorId];
													return (
														<div className="community-reply" key={reply.id}>
															<div className="user-reply-header">
																<img
																	className="user-profile-photo"
																	src={
																		userProfile?.profile?.picture ||
																		"default-image-url"
																	}
																	alt="user profile photo"
																/>

																<h4>
																	{userProfile?.username || "Unknown User"}
																</h4>
																{reply.authorId === user.id && (
																	<button
																		className="forum-delete"
																		onClick={() =>
																			handleReplyDelete(comment.id, reply.id)
																		}
																	>
																		Delete
																	</button>
																)}
															</div>
															<p>{reply.content}</p>
															{console.log("Reply details:", reply)}
														</div>
													);
												})}
										</div>
									</div>
									<div className="reply-separator"></div>
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
