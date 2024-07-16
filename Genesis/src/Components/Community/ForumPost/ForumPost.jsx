import React, { useState, useEffect } from "react";
import "./ForumPost.css";
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png"
import upvote_active_icon from "../../../assets/png/upvote_active.png"
import message_icon from "../../../assets/png/reply_icon.png"


const ForumPost = () => {

    return (
    <>
    <div className="forum-post-container">
        {/* Forum post header */}
        <div className="forum-post-header">
            <div className="forum-user-profile">
                <img className="user-profile-photo" src="https://placehold.co/50x50" alt="User profile photo" />
                <p className="forum-post-username">Brenda Aceves</p>
            </div>
        <p>1 day ago</p>
        </div>
        {/* Main content */}
        <div className="forum-content">
        <h4>Appreciation Post</h4>
        <p>I just wanted to give a HUGE shout out to my team for finishing our first version of our product! If it weren’t for my incredibly talented developers and designers, I couldn’t imagine being where I’m at..</p>

        <div className="forum-post-interactions">
            <div className="likes">
                <p>0</p>
                <img className="forum-icon"src={upvote_inactive_icon} alt="upvote status" />
            </div>
            <div className="messages">
                <p>0</p>
                <img className="forum-icon" src={message_icon} alt="Message Icon" />
            </div>
        </div>
        </div>   
    </div>
    </>
    );
};

export default ForumPost;
