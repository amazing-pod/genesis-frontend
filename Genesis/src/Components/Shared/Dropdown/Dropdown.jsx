import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import dropdown_icon from "../../../assets/png/dropdown_icon.png";
import dropdown_icon_purple from "../../../assets/png/dropdown_icon_purple.png"


const Dropdown = ( { dropdownPlaceholder, dropdownOptions } ) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [option, setOption] = useState(dropdownPlaceholder);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Handle item clicks within dropdown, then close dropdown
    const handleDropdownItemClick = (optionName) => {
        setOption(optionName);
        setDropdownOpen(false);
    };    

  // Close dropdown after clicking outside it
    const handleOutsideClick = (event) => {
    if (!event.target.closest('.shared-dropdown') && dropdownOpen) {
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
    <div className="shared-dropdown-option-container">

        {/* Dropdown */}
        <div className="shared-dropdown">
        <div className="shared-dropdown-view">
            <button onClick={toggleDropdown} className="dropbtn">
            {option}
            <img className="dropdown-icon" src={dropdown_icon_purple} alt="dropdown icon" />
            </button>
        </div>

        <div className={`shared-dropdown-content ${dropdownOpen ? 'show' : ''}`}>
        {dropdownOptions.map((option, index) => (
            <p key={index} onClick={() => handleDropdownItemClick(option)}>{option}</p>
        ))}

        </div>
        </div>
    
    </div>

    </>
);
};

export default Dropdown;