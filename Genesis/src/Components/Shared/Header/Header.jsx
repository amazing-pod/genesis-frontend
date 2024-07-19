import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import profile_photo from "../../../assets/png/profile_photo.png"
import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
} from '@novu/notification-center';

const Header = () => {
    return (
    <>
        <header>
            <div className="header-navigation">
                <Link to="/home">Home</Link>
                <Link to="/brainstorm">Brainstorm</Link>
                <Link to="/community">Community</Link>
            </div>
            <div className="header-item-container">
                <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'6shjFasFADUI'}>
                    <PopoverNotificationCenter colorScheme={'light'}>
                        {({ unseenCount }) => (
                            <NotificationBell unseenCount={unseenCount} />
                        )}
                    </PopoverNotificationCenter>
                </NovuProvider>
                <img className="profile-icon" src={profile_photo} alt="User profile photo" />
            </div>            
        </header>
    </>
    );
};

export default Header;
