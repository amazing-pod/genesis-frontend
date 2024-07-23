import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import profile_photo from "../../../assets/png/profile_photo.png";
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = () => {
        // Logic for signing out, such as clearing authentication tokens
       navigate('/'); // Redirect to login/register page
    };

    const handleProfilePage = () => {
        navigate('/user-profile'); // Redirect to user profile page
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
                    <NovuProvider subscriberId={'6695569b2b72370872914016'} applicationIdentifier={'6shjFasFADUI'}>
                        <PopoverNotificationCenter colorScheme={'light'}>
                            {({ unseenCount }) => (
                                <NotificationBell unseenCount={unseenCount} />
                            )}
                        </PopoverNotificationCenter>
                    </NovuProvider>
                    <div className="profile-container" onClick={handleProfileClick}>
                        <img className="profile-icon" src={profile_photo} alt="User profile photo" />
                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div onClick={handleProfilePage}>Profile</div>
                                <div onClick={handleSignOut}>Sign Out</div>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
