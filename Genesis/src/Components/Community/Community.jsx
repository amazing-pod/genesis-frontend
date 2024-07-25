import React, { useState, useEffect } from 'react';
import "./Community.css";
import Header from '../Shared/Header/Header';
import dropdown_icon from "../../assets/png/dropdown_icon.png";
import CreatePost from '../Community/ForumPost/CreatePost';
import ForumPost from './ForumPost/ForumPost';

const samplePosts = [   
    {
        id: 4,
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
        
    },
    {
        id: 3,
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
      
    },
    {
        id: 2,
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
       
    },
    {
        id: 1,
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
        
    }
];

const MiniNavbar = ({ filter, setFilter, toggleCreatePost, dropdownOpen, toggleDropdown }) => {

    const handleDropdownItemClick = (filterName) => {
        setFilter(filterName);
        toggleDropdown();
    };

    const handleOutsideClick = (event) => {
        if (!event.target.closest('.dropdown') && dropdownOpen) {
            toggleDropdown();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        };
    }, [dropdownOpen]);
   
    

    return (
        <div className="mini-navbar">
            <div className="dropdown">
                <div className="dropdown-view">
                    <button onClick={toggleDropdown} className="dropbtn">
                        {filter}
                        <img className="dropdown-icon" src={dropdown_icon} alt="dropdown icon" />
                    </button>
                </div>
                <div id="myDropdown" className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
                    <p onClick={() => handleDropdownItemClick('Newest')}>Newest</p>
                    <p onClick={() => handleDropdownItemClick('Oldest')}>Oldest</p>
                    <p onClick={() => handleDropdownItemClick('Most Liked')}>Most Liked</p>
                </div>
            </div>
            <p className="new-post" onClick={toggleCreatePost}>New Post +</p>
        </div>
    );
};

const Community = () => {
    const [ posts, setPosts] = useState(samplePosts);
    const [filter, setFilter] = useState('Newest');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);

    const handleCreatePost = (newPost) => {
            setPosts(posts => [newPost, ...posts]);
    };

    useEffect(() => {
        sortPosts(filter);
    }, [posts, filter]);

    const sortPosts = (filter) => {
        let sorted = [...posts];
        if (filter === 'Oldest') {
            sorted.sort((a, b) => a.id - b.id);
        } else if (filter === 'Newest') {
            sorted.sort((a, b) => b.id - a.id);
        } else if (filter === 'Most Liked') {
            sorted.sort((a, b) => b.likes - a.likes);
        }
        setPosts(sorted);
    };

    const toggleCreatePost = () => {
        setShowCreatePost(!showCreatePost);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
   

    return (
        <>
            <Header />
            <div className="community-page-container">
                <MiniNavbar 
                    filter={filter}
                    setFilter={setFilter}
                    toggleCreatePost={toggleCreatePost}
                    dropdownOpen={dropdownOpen}
                    toggleDropdown={toggleDropdown}
                />
                <hr />
                {showCreatePost && (
                    <CreatePost onCreatePost={handleCreatePost} />
                )}
                <div className="posts-container">
                    {posts.map(post => (
                        <ForumPost key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Community;

