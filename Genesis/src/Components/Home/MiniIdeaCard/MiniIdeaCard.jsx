import React from 'react';
import './MiniIdeaCard.css';

const MiniIdeaCard = () => {
  return (
    <>
    <div className="mini-idea-card-container">
        <div className="mini-idea-header">
            <h3>Most Feasibile</h3>
        </div>
        <div className="mini-idea-body">
            <h3>Project Name</h3>
            <p>A simple password manager to help with...</p>
        </div>
    </div>
    </>
  );
};

export default MiniIdeaCard;
