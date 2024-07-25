import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/backtrack_icon.png";
import axios from "axios";

const samplePosts = [
	{
		id: 1,
		userProfilePhoto: "https://placehold.co/50x50",
		username: "Brenda Aceves",
		timeAgo: "1 day ago",
		title: "Appreciation Post",
		content:
			"I just wanted to give a HUGE shout out to my team for finishing our first version of our product! If it weren’t for my incredibly talented developers and designers, I couldn’t imagine being where I’m at..",
		likes: 4,
		comments: [
			{
				user: "User1",
				text: "Congratulations!",
				userProfilePhoto: "https://placehold.co/50x50",
			},
			{
				user: "User2",
				text: "Well done team!",
				userProfilePhoto: "https://placehold.co/50x50",
			},
		],
	},
	{
		id: 2,
		userProfilePhoto: "https://placehold.co/50x50",
		username: "John Doe",
		timeAgo: "2 days ago",
		title: "Feature Suggestion",
		content:
			"I think it would be great if we could add a dark mode to the app. It's becoming a standard feature and our users would appreciate it.",
		likes: 7,
		comments: [
			{
				user: "User3",
				text: "I second this!",
				userProfilePhoto: "https://placehold.co/50x50",
			},
			{
				user: "User4",
				text: "Dark mode would be awesome!",
				userProfilePhoto: "https://placehold.co/50x50",
			},
		],
	},
	{
		id: 3,
		userProfilePhoto: "https://placehold.co/50x50",
		username: "Alice Smith",
		timeAgo: "3 days ago",
		title: "Bug Report",
		content:
			"I'm experiencing a crash when I try to upload an image. Has anyone else encountered this issue?",
		likes: 2,
		comments: [
			{
				user: "User5",
				text: "Yes, I'm having the same problem.",
				userProfilePhoto: "https://placehold.co/50x50",
			},
			{
				user: "User6",
				text: "It works fine for me. Maybe try reinstalling?",
				userProfilePhoto: "https://placehold.co/50x50",
			},
		],
	},
	{
		id: 4,
		userProfilePhoto: "https://placehold.co/50x50",
		username: "Bob Johnson",
		timeAgo: "4 days ago",
		title: "Weekly Standup",
		content:
			"Reminder: Our weekly standup meeting is tomorrow at 10 AM. Please make sure to have your updates ready.",
		likes: 1,
		comments: [
			{
				user: "User7",
				text: "Got it!",
				userProfilePhoto: "https://placehold.co/50x50",
			},
			{
				user: "User8",
				text: "Thanks for the reminder.",
				userProfilePhoto: "https://placehold.co/50x50",
			},
		],
	},
];

const PostDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [post, setPost] = useState([]);
	const [likes, setLikes] = useState(post.likes);
	const [liked, setLiked] = useState(false);
	const [replies, setReplies] = useState(post.replies);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		const fetchPost = async () => {
			const response = await axios.get(
				`${import.meta.env.VITE_GENESIS_API_PROD_URL}/threads/posts`
			);
			console.log(response.data);
			setPost(response.data.find((post) => post.id === parseInt(id)));
		};
		fetchPost();
	}, []);

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
				...replies,
				{
					user: "CurrentUser",
					text: newComment,
					userProfilePhoto: "https://placehold.co/50x50",
					id: replies.length + 1,
				},
			];
			setReplies(updatedComments);
			setNewComment("");
		}
	};

	const handleCommentDelete = (commentId) => {
		setReplies(replies.filter((comment) => comment.id !== commentId));
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
								<img src={post.userProfilePhoto} alt="user profile photo" />
								<p>{post.username}</p>
							</div>
							<p>{post.timeAgo}</p>
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
							{comments.map((comment) => (
								<div className="comment" key={comment.id}>
									<div className="user-comment-header">
										<img
											src={comment.userProfilePhoto}
											alt="user profile photo"
										/>
										<h3>{comment.user}</h3>
									</div>
									<p>{comment.text}</p>
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
