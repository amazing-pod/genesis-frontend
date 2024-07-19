import React, { useState, useEffect } from 'react';
import './MiniNavbar.css';
import dropdown_icon from "../../../assets/png/dropdown_icon.png"

const MiniNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filter, setFilter] = useState('Category');

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
    if (!event.target.closest('.dropdown')) {
      setDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside dropdown
  useEffect(() => {
    if (dropdownOpen) {
      window.addEventListener('click', handleOutsideClick);
    } else {
      window.removeEventListener('click', handleOutsideClick);
    }

    // Cleanup function to remove event listener when component unmounts
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [dropdownOpen]); // Ensures effect runs when dropdownOpen changes

  return (
    <>
      {/* Mini-navbar */}
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

      <p>New Post +</p>

      </div>
      


      {/* Using {filter} will allow you to access the filtered dropdown option */}
      {/* <p>Selected Filter: {filter}</p> */}
    </>
  );
};

export default MiniNavbar;

