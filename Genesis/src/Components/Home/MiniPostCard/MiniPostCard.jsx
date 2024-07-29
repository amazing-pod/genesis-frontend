import React, {useState, useEffect} from 'react';
import './MiniPostCard.css';
import profile_photo from "../../../assets/png/profile_photo.png"
import upvote_inactive_icon from "../../../assets/png/upvote_inactive.png";
import upvote_active_icon from "../../../assets/png/upvote_active.png";
import message_icon from "../../../assets/png/reply_icon.png";

const MiniPostCard = () => {
  // const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  // const navigate = useNavigate();

  // const samplePosts = [
  //   {
  //     id: 1,
  //     userProfilePhoto: "https://placehold.co/50x50",
  //     username: "Brenda Aceves",
  //     timeAgo: "1 day ago",
  //     title: "Appreciation Post",
  //     content:
  //       "I just wanted to give a HUGE shout out to my team for finishing our first version of our product! If it weren’t for my incredibly talented developers and designers, I couldn’t imagine being where I’m at..",
  //     likes: 4,
  //     comments: [
  //       { user: "User1", text: "Congratulations!", userProfilePhoto: "https://placehold.co/50x50" },
  //       { user: "User2", text: "Well done team!", userProfilePhoto: "https://placehold.co/50x50" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     userProfilePhoto: "https://placehold.co/50x50",
  //     username: "John Doe",
  //     timeAgo: "2 days ago",
  //     title: "Feature Suggestion",
  //     content:
  //       "I think it would be great if we could add a dark mode to the app. It's becoming a standard feature and our users would appreciate it.",
  //     likes: 7,
  //     comments: [
  //       { user: "User3", text: "I second this!", userProfilePhoto: "https://placehold.co/50x50" },
  //       { user: "User4", text: "Dark mode would be awesome!", userProfilePhoto: "https://placehold.co/50x50" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     userProfilePhoto: "https://placehold.co/50x50",
  //     username: "Alice Smith",
  //     timeAgo: "3 days ago",
  //     title: "Bug Report",
  //     content:
  //       "I'm experiencing a crash when I try to upload an image. Has anyone else encountered this issue?",
  //     likes: 2,
  //     comments: [
  //       { user: "User5", text: "Yes, I'm having the same problem.", userProfilePhoto: "https://placehold.co/50x50" },
  //       { user: "User6", text: "It works fine for me. Maybe try reinstalling?", userProfilePhoto: "https://placehold.co/50x50" },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     userProfilePhoto: "https://placehold.co/50x50",
  //     username: "Bob Johnson",
  //     timeAgo: "4 days ago",
  //     title: "Weekly Standup",
  //     content:
  //       "Reminder: Our weekly standup meeting is tomorrow at 10 AM. Please make sure to have your updates ready.",
  //     likes: 1,
  //     comments: [
  //       { user: "User7", text: "Got it!", userProfilePhoto: "https://placehold.co/50x50" },
  //       { user: "User8", text: "Thanks for the reminder.", userProfilePhoto: "https://placehold.co/50x50" },
  //     ],
  //   },
  // ];
  

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
            <h3>First time posting!</h3>
            <img src={profile_photo} alt="user profile photo" />
        </div>
        {/* Post Info/Body */}
        <div className="mini-post-body">
            <p>A simple post desciption that the user will see here...</p>
        </div>
        {/* Post Interactions: Likes and Messages */}
        <div className="mini-post-interactions">
          <p>4</p>
          <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
          <p>5</p>
          <img className="forum-icon" src={message_icon} alt="Message Icon" />
        </div>
        
          {/* <div className="post-interactions">
            <p>{likes}</p>
            <img onClick={handleLikeClick} className="forum-icon" src={liked ? upvote_active_icon : upvote_inactive_icon} alt="upvote status" />
            <p>{post.comments.length}</p>
            <img className="forum-icon" src={message_icon} alt="Message Icon" />
          </div> */}
    </div>
    </>
  );
};

export default MiniPostCard;
