import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import profile_photo from "../../assets/png/profile_photo.png"

const Header = () => {
    return (
    <>
        <header>
            <div className="header-navigation">
                <Link to="/home">Home</Link>
                <Link to="/brainstorm">Brainstorm</Link>
                <Link to="/community">Community</Link>
            </div>
            <img className="profile-icon" src={profile_photo} alt="User profile photo" />
        </header>
    </>
    );
};

export default Header;
