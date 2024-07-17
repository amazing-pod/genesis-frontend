import React from 'react';
import './IdeaCard.css';
import bookmark_inactive_icon from "../../../assets/png/bookmark_inactive.png";
import bookmark_active_icon from "../../../assets/png/bookmark_active.png";

const IdeaCard = ({ title, description, projectFeatures, impact, feasibility, difficulty, category, bookmarked }) => {
    // Conditional rendering for bookmark
    let bookmarkSource = bookmark_inactive_icon;

    if (bookmarked == false) {
        bookmarkSource = bookmark_inactive_icon;
    } else {
        bookmarkSource = bookmark_active_icon;
    }

    // Determine if each dot is active (pink) or inactive (gray) based on ratings
    let ratingGenerator = (rating) => {
        let result = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                result.push("circle-active")
            } else {
                result.push("circle-empty");
            }
        }
        return result;
    }
    const feasibilityArray = ratingGenerator(feasibility);
    const impactArray = ratingGenerator(impact);
    const difficultyArray = ratingGenerator(difficulty);

    
    return (
        <>
            <div className="idea-card">
                <div className="idea-header">
                    <h3>{title}</h3>
                </div>
                <h3>Description</h3>
                <p className="idea-description">{description}</p>

                <div className="idea-rating-container">
                <div className="idea-rating">
                    <p>Impact</p>
                    <div className="rating-circles">
                    {/* Based on the impact array, display rating */}
                    {impactArray.map((impactRating) => (
                        <div className={impactRating}></div>
                    ))}
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Feasibility</p>
                    <div className="rating-circles">
                    {/* Based on the impact array, display rating */}
                    {feasibilityArray.map((feasibilityRating) => (
                        <div className={feasibilityRating}></div>
                    ))}
                    </div>
                </div>

                <div className="idea-rating">
                    <p>Difficulty</p>
                    <div className="rating-circles">
                    {/* Based on the difficulty array, display difficulty */}
                    {difficultyArray.map((difficultyRating) => (
                        <div className={difficultyRating}></div>
                    ))}
                    </div>
                </div>

                <div className="idea-extra-info">
                    <div className="idea-tag">{category}</div>
                    <img className="bookmark-icon" src={bookmarkSource} alt="Bookmark status" />
                </div>
            </div>                    
        </div>
        </>
    );
};

export default IdeaCard;
