import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import profile_photo from "../../../assets/png/profile_photo.png";
import { UserButton } from '@clerk/clerk-react';

const Header = () => {
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = () => {
        navigate('/'); // Redirect to login/register page
    };

    const handleProfilePage = () => {
        // Pass the current path to the UserProfile component
        navigate('/user-profile', { state: { previousPath: location.pathname } });
    }; 

    return (
        <>
            <header>
                <div className="header-navigation">
                    <Link to="/home">Home</Link>
                    <Link to="/brainstorm">Brainstorm</Link>
                    <Link to="/community">Community</Link>
                </div>
                <div className="header-item-container">
                   
                       
                    <div className="profile-container" onClick={handleProfileClick}>
                        {/* <img className="profile-icon" src={profile_photo} alt="User profile photo" />
                        {showDropdown && (
                            <div className="profile-dropdown-menu">
                                <p onClick={handleProfilePage}>Profile</p>
                                <p onClick={handleSignOut}>Sign Out</p>
                            </div>
                        )} */}
                        <UserButton />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
