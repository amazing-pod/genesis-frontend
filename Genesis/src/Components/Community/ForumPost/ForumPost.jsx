import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForumPost.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";

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
        ],
        tags: ["Team", "Achievement"]
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
        ],
        tags: ["Feature", "Suggestion"]
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
        ],
        tags: ["Bug", "Help"]
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
        ],
        tags: ["Reminder", "Meeting"]
    }
];

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
                {/* Tags */}
                <div className="post-tags">
                    {(post.tags || []).map(tag => (
                        <button key={tag} className="tag-button">{tag}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ForumPost;
