import React, {useState, useEffect} from 'react';
import './MiniPostCard.css';
import profile_photo from "../../../assets/png/profile_photo.png"
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";

// Should take in a title, content, like count,
const MiniPostCard = ({title, description, likeCount, replyCount, profilePicture}) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = (event) => {
      event.stopPropagation(); // Prevents navigating to the post when liking
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
  };

  return (
    <>
    <div className="mini-post-card-container">
        {/* Post Header */}
        <div className="mini-post-header">
            <h3>{title}</h3>
            <img src={profilePicture} alt="user profile photo" />
        </div>
        {/* Post Info/Body */}
        <div className="mini-post-body">
            <p>{description}</p>
        </div>
        {/* Post Interactions: Likes and Messages */}
        <div className="mini-post-interactions">
          <p>{likeCount}</p>
          <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
          <p>{replyCount}</p>
          <img className="forum-icon" src={message_icon} alt="Message Icon" />
        </div>
    </div>
    </>
  );
};

export default MiniPostCard;
