import React from 'react';
import './Landing.css';
import community_image from "../../assets/png/landing_community.png"
import project_collaboration_image from "../../assets/svg/landing_project_collaboration.svg"
import project_ideation_image from "../../assets/png/landing_project_ideation.png"
import project_landing_image from "../../assets/svg/landing_project_management.svg"

const Landing = () => {
  return (
    <>
    {/* Header */}
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Genesis</h1>
      </div>
      <div className="header-right">
        <button className="header-login">Log In</button>
        <button className="header-signup">Sign Up</button>
      </div>
    </header>


    <img src={community_image} alt="Community Image" />
    <img src={project_collaboration_image} alt="Community Image" />
    <img src={project_ideation_image} alt="Community Image" />
    <img src={project_landing_image} alt="Community Image" />
    
    </>
  );
};

export default Landing;









