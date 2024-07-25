import React, { useState } from 'react';
import './IdeaCard.css';
import bookmark_inactive_icon from "../../../assets/png/bookmark_inactive.png";
import bookmark_active_icon from "../../../assets/png/bookmark_active.png";

const IdeaCard = ({ id, title, description, projectFeatures, impact, feasibility, difficulty, category, bookmarked, openModal }) => {
    const [bookmarkToggle, setBookmarkToggle] = useState(bookmarked);
    const tagClass = `${category.toLowerCase()}-tag`;

    let ratingGenerator = (rating) => {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(i < rating ? "circle-active" : "circle-empty");
        }
        return result;
    };
    
    const feasibilityArray = ratingGenerator(feasibility);
    const impactArray = ratingGenerator(impact);
    const difficultyArray = ratingGenerator(difficulty);

    const handleClick = () => {
        // Don't open modal if user clicks on bookmark icon
        if (!event.target.classList.contains('bookmark-icon')) {
            openModal(id);
        }
    };

    return (
        <div className="idea-card" onClick={handleClick}>
            <div className="idea-header">
                <h3>{title}</h3>
            </div>
            <h3>Description</h3>
            <p className="idea-description">{description}</p>

            <div className="idea-rating-container">
                <div className="idea-rating">
                    <p>Impact</p>
                    <div className="rating-circles">
                        {impactArray.map((rating, index) => (
                            <div key={index} className={rating}></div>
                        ))}
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Feasibility</p>
                    <div className="rating-circles">
                        {feasibilityArray.map((rating, index) => (
                            <div key={index} className={rating}></div>
                        ))}
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Difficulty</p>
                    <div className="rating-circles">
                        {difficultyArray.map((rating, index) => (
                            <div key={index} className={rating}></div>
                        ))}
                    </div>
                </div>

                <div className="idea-extra-info">
                    <div className={tagClass}>{category}</div>
                    <img className="bookmark-icon" onClick={() => setBookmarkToggle(!bookmarkToggle)} src={bookmarkToggle ? bookmark_active_icon : bookmark_inactive_icon} alt="Bookmark status" />
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;
