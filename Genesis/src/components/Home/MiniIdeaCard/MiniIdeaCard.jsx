import React from 'react';
import './MiniIdeaCard.css';

const MiniIdeaCard = ({title, name, description}) => {
  // console.log("IDEA DATA:");
  // console.log(ideaData);
  return (
    <>
    <div className="mini-idea-card-container">
        <div className="mini-idea-header">
            <h3>Most Feasibile</h3>
        </div>
        <div className="mini-idea-body">
            <h3>Project Name</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Fusce imperdiet tellus nec augue mattis, et interdum elit cursus. 
            </p>
        </div>
    </div>
    </>
  );
};

export default MiniIdeaCard;
