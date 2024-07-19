import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/back_icon.png";

// Sample posts data
const samplePosts = [
    {
        id: 1,
        userProfilePhoto: "https://placehold.co/50x50",
        username: "Brenda Aceves",
        timeAgo: "1 day ago",
        title: "Appreciation Post",
        content: "I just wanted to give a HUGE shout out to my team for finishing our first version of our product! If it weren’t for my incredibly talented developers and designers, I couldn’t imagine being where I’m at..",
        likes: 4,
        comments: [
            { user: "User1", text: "Congratulations!" },
            { user: "User2", text: "Well done team!" }
        ]
    },
    {
        id: 2,
        userProfilePhoto: "https://placehold.co/50x50",
        username: "John Doe",
        timeAgo: "2 days ago",
        title: "Feature Suggestion",
        content: "I think it would be great if we could add a dark mode to the app. It's becoming a standard feature and our users would appreciate it.",
        likes: 7,
        comments: [
            { user: "User3", text: "I second this!" },
            { user: "User4", text: "Dark mode would be awesome!" }
        ]
    },
    {
        id: 3,
        userProfilePhoto: "https://placehold.co/50x50",
        username: "Alice Smith",
        timeAgo: "3 days ago",
        title: "Bug Report",
        content: "I'm experiencing a crash when I try to upload an image. Has anyone else encountered this issue?",
        likes: 2,
        comments: [
            { user: "User5", text: "Yes, I'm having the same problem." },
            { user: "User6", text: "It works fine for me. Maybe try reinstalling?" }
        ]
    },
    {
        id: 4,
        userProfilePhoto: "https://placehold.co/50x50",
        username: "Bob Johnson",
        timeAgo: "4 days ago",
        title: "Weekly Standup",
        content: "Reminder: Our weekly standup meeting is tomorrow at 10 AM. Please make sure to have your updates ready.",
        likes: 1,
        comments: [
            { user: "User7", text: "Got it!" },
            { user: "User8", text: "Thanks for the reminder." }
        ]
    }
];

const PostDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const post = samplePosts.find(post => post.id === parseInt(id));
    
    // Ensure post exists before proceeding
    if (!post) {
        return <div>Post not found</div>;
    }

    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(post.comments);
    const [newComment, setNewComment] = useState("");

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
            setComments([...comments, { user: "CurrentUser", text: newComment, id: comments.length + 1 }]);
            setNewComment("");
        }
    };

    const handleCommentDelete = (commentId) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    const handleBackClick = () => {
        navigate("/community");
    };

    return (
        <div className="post-details-container">
            <img
                src={back_icon}
                alt="Back"
                className="back-icon"
                onClick={handleBackClick}
            />
            <div className="post-details-header">
                <div className="forum-user-profile">
                    <img className="user-profile-photo" src={post.userProfilePhoto} alt="User profile photo" />
                    <p className="forum-post-username">{post.username}</p>
                </div>
                <p>{post.timeAgo}</p>
            </div>
            <div className="post-details-content">
                <h4>{post.title}</h4>
                <p>{post.content}</p>

                <div className="post-details-interactions">
                    <div className="likes" onClick={handleLikeClick}>
                        <p>{likes}</p>
                        <img className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
                    </div>
                    <div className="messages">
                        <p>{comments.length}</p>
                        <img className="forum-icon" src={message_icon} alt="Message Icon" />
                    </div>
                </div>
            </div>
            <div className="comments-section">
                <h5>Comments</h5>
                {comments.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <p><strong>{comment.user}:</strong> {comment.text}</p>
                        {comment.user === "CurrentUser" && (
                            <img
                                className="delete-icon"
                                src={delete_icon}
                                alt="Delete Comment"
                                onClick={() => handleCommentDelete(comment.id)}
                            />
                        )}
                    </div>
                ))}
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        placeholder="Add a comment..."
                        required
                    />
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    );
};

export default PostDetails;
