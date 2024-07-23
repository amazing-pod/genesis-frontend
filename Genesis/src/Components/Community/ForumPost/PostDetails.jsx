import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostDetails.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";
import delete_icon from "../../../assets/png/delete_icon.png";
import back_icon from "../../../assets/png/backtrack_icon.png";

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
    <div className="post-detail-container">
        <div className="post-items">
            {/* "Go back text", where a user returns back to the community page */}
            <span className="post-backtrack">
                <img src={back_icon} alt="Back" className="back-icon" onClick={handleBackClick}/>
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
                <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
                <p>{comments.length}</p>
                <img className="forum-icon" src={message_icon} alt="Message Icon" />
                </div>
            </div>
            {/* If the user made the post, put a delete button here */}
            <div className="post-separator">

            </div>

            <div className="post-details">
            <h2>Discussion</h2>
            <hr />

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
        </div>


    </div>
    );
};

export default PostDetails;
