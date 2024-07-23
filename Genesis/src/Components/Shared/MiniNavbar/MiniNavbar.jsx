import React, { useState, useEffect } from 'react';
import './MiniNavbar.css';
import dropdown_icon from "../../../assets/png/dropdown_icon.png";
import CreatePost from '../../Community/ForumPost/CreatePost';
import ForumPost from '../../Community/ForumPost/ForumPost';

// Sample post data
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

const MiniNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('Category');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState(samplePosts);
  const [sortedPosts, setSortedPosts] = useState([]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle item clicks within dropdown, then close dropdown
  const handleDropdownItemClick = (filterName) => {
    setFilter(filterName);
    setDropdownOpen(false);
    sortPosts(filterName);
  };

  // Close dropdown after clicking outside it
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.dropdown') && dropdownOpen) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside dropdown
  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    sortPosts(filter);
  }, [filter, posts]);

  const sortPosts = (filter) => {
    let sorted = [...posts];
    if (filter === 'Oldest') {
      // Sorting by "timeAgo" as a proxy for date
      sorted.sort((a, b) => {
        const timeA = parseInt(a.timeAgo.split(' ')[0]);
        const timeB = parseInt(b.timeAgo.split(' ')[0]);
        return timeB - timeA;
      });
    } else if (filter === 'Newest') {
      sorted.sort((a, b) => {
        const timeA = parseInt(a.timeAgo.split(' ')[0]);
        const timeB = parseInt(b.timeAgo.split(' ')[0]);
        return timeA - timeB;
      });
    } else if (filter === 'Most Liked') {
      sorted.sort((a, b) => b.likes - a.likes);
    }
    setSortedPosts(sorted);
  };

  return (
    <>
      <div className="mini-navbar">

        {/* Dropdown */}
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
      
        {/* New Post Section */}
        <p className="new-post" onClick={() => setShowCreatePost(!showCreatePost)}>New Post +</p>
      </div>

      {showCreatePost && (
          <CreatePost />
      )}

      <div className="posts-container">
        {sortedPosts.map(post => (
          <ForumPost key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default MiniNavbar;
