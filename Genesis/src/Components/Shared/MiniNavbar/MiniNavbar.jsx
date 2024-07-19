import React, { useState, useEffect } from 'react';
import './MiniNavbar.css';
import dropdown_icon from "../../../assets/png/dropdown_icon.png";
import CreatePost from '../../Community/ForumPost/CreatePost';


const MiniNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('Category');
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Handle item clicks within dropdown, then close dropdown
  const handleDropdownItemClick = (filterName) => {
    setFilter(filterName);
    setDropdownOpen(false);
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
            <p onClick={() => handleDropdownItemClick('Most Impact')}>Most Impact</p>
            <p onClick={() => handleDropdownItemClick('Most Feasible')}>Most Feasible</p>
            <p onClick={() => handleDropdownItemClick('Most Difficult')}>Most Difficult</p>
            <p onClick={() => handleDropdownItemClick('Easiest')}>Easiest</p>
          </div>
        </div>
      
        {/* New Post Section */}
        <p className="new-post" onClick={() => setShowCreatePost(!showCreatePost)}>New Post +</p>

      </div>

      {showCreatePost && (
        <div className="create-post-container">
          <CreatePost />
        </div>
      )}
    </>
  );
};

export default MiniNavbar;