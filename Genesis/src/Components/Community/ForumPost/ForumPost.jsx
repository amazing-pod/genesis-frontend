import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForumPost.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";

const ForumPost = ({ post }) => {
    const [likes, setLikes] = useState(post.likes);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    const handleLikeClick = (event) => {
        event.stopPropagation(); // Prevents navigating to the post when liking
        setLikes(liked ? likes - 1 : likes + 1);
        setLiked(!liked);
    };

    const handlePostClick = () => {
        navigate(`/community/post/${post.id}`); // Navigate to the post details page
    };

    return (
        <div className="forum-post-container" onClick={handlePostClick}>
            {/* Forum post header */}
            <div className="forum-post-header">
                <div className="forum-user-profile">
                    <img className="user-profile-photo" src={post.userProfilePhoto} alt="User profile photo" />
                    <p className="forum-post-username">{post.username}</p>
                </div>
                <p>{post.timeAgo}</p>
            </div>
            {/* Main content */}
            <div className="forum-content">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                {/* Post Interactions: Likes and Messages */}
                <div className="post-interactions">
                    <p>{likes}</p>
                    <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
                    <p>{post.comments.length}</p>
                    <img className="forum-icon" src={message_icon} alt="Message Icon" />
                </div>
            </div>
        </div>
    );
};

export default ForumPost;
