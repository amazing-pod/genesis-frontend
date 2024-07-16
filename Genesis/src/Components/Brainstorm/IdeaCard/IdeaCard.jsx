import React from 'react';
import './IdeaCard.css';
import bookmark_inactive_icon from "../../../assets/png/bookmark_inactive.png";
import bookmark_active_icon from "../../../assets/png/bookmark_active.png";

const IdeaCard = () => {

    return (
        <>
            <div className="idea-card">
                <div className="idea-header">
                    <h3>Idea Name</h3>
                    <p>1 day ago</p>
                </div>
                <h3>Description</h3>
                <p className="idea-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rutrum sagittis lectus a semper. 
                    Vestibulum vitae massa non sapien consequat ultrices sed vitae mauris. Morbi consequat, odio sagittis ultricies ultricies, augue 
                    lectus fringilla diam, ac sagittis ipsum risus vel sapien. Quisque id dolor orci. Sed non semper odio. Integer egestas, libero at 
                    faucibus vestibulum, tellus elit molestie felis, eget tempor dui nunc id odio. Morbi maximus nulla id libero accumsan pellentesque. 
                    Sed a facilisis dolor, euismod sagittis nibh. Cras justo ipsum, sagittis sit amet tortor quis, efficitur tincidunt neque. Duis dictum 
                    sagittis lectus, nec dictum massa efficitur at. Pellentesque eget elit elementum, bibendum metus at, tincidunt lectus. Quisque placerat 
                    tortor semper ipsum auctor, sit amet dapibus ipsum efficitur. Maecenas sit amet efficitur quam.
                </p>


                <div className="idea-rating-container">
                <div className="idea-rating">
                    <p>Impact</p>
                    <div className="rating-circles">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle-empty"></div>
                        <div className="circle-empty"></div>
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Feasibility</p>
                    <div className="rating-circles">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle-empty"></div>
                        <div className="circle-empty"></div>
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Difficulty</p>
                    <div className="rating-circles">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle-empty"></div>
                        <div className="circle-empty"></div>
                    </div>
                </div>

                <div className="idea-extra-info">
                    <div className="idea-tag">tag name here</div>
                    <img className="bookmark-icon" src={bookmark_active_icon} alt="Bookmark status" />
                </div>

            </div>                    
        </div>
        </>
    );
};

export default IdeaCard;
