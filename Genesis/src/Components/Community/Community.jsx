import React from "react";
import "./Community.css";
import Header from '../Shared/Header/Header';
import MiniNavbar from "../Shared/MiniNavbar/MiniNavbar";
import ForumPost from './ForumPost/ForumPost';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const Community = () => {
    return (
        <>
            <Header />
            <div className="community-page-container">
                <MiniNavbar />
                <hr />
                {samplePosts.map(post => (
                    <ForumPost key={post.id} post={post} />
                ))}
				<ToastContainer />
            </div>
        </>
    );
};

export default Community;
