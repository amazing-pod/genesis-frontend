import React, {useState, useEffect} from 'react';
import './Home.css';
// Component Imports
import Header from '../Shared/Header/Header';
import MiniIdeaCard from './MiniIdeaCard/MiniIdeaCard';
import IdeaCard from '../Brainstorm/IdeaCard/IdeaCard';
import MiniPostCard from './MiniPostCard/MiniPostCard';

const Home = () => {
  const ideaDummyData = [
    {
      id: 1,
      title: "Community Garden Initiative",
      description: "Create a community garden to promote sustainable living and local food production.",
      projectFeatures: [
        "Raised beds",
        "Compost station",
        "Education workshops"
      ],
      dayGenerated: "2023-07-14",
      impact: 5,
      feasibility: 4,
      difficulty: 3,
      category: "Environment",
      bookmarked: true
    },
    {
      id: 2,
      title: "Online Learning Platform",
      description: "Build a platform offering courses and tutorials in various subjects.",
      projectFeatures: [
        "Video lectures",
        "Interactive quizzes",
        "Progress tracking"
      ],
      dayGenerated: "2023-07-12",
      impact: 4,
      feasibility: 4,
      difficulty: 3,
      category: "Education",
      bookmarked: true
    },
    {
      id: 3,
      title: "Green Energy Solutions",
      description: "Implement renewable energy solutions to reduce carbon footprint in urban areas.",
      projectFeatures: [
        "Solar panel installations",
        "Wind turbine farms",
        "Energy-efficient buildings"
      ],
      dayGenerated: "2023-07-10",
      impact: 5,
      feasibility: 3,
      difficulty: 4,
      category: "Environment",
      bookmarked: true
    },
    {
      id: 4,
      title: "Green Energy Solutions",
      description: "Implement renewable energy solutions to reduce carbon footprint in urban areas.",
      projectFeatures: [
        "Solar panel installations",
        "Wind turbine farms",
        "Energy-efficient buildings"
      ],
      dayGenerated: "2023-07-10",
      impact: 5,
      feasibility: 3,
      difficulty: 4,
      category: "Environment",
      bookmarked: true
    },
    {
      id: 5,
      title: "Green Energy Solutions",
      description: "Implement renewable energy solutions to reduce carbon footprint in urban areas.",
      projectFeatures: [
        "Solar panel installations",
        "Wind turbine farms",
        "Energy-efficient buildings"
      ],
      dayGenerated: "2023-07-10",
      impact: 5,
      feasibility: 3,
      difficulty: 4,
      category: "Environment",
      bookmarked: true
    },
  ];


  return (
    <>
      <Header />
      <div className="home-page-container">
        {/* Sidebar Items */}
        <div className="home-sidebar-container">
          <h3>Idea Highlights</h3>
          <hr />
          <div className="mini-idea-container">
            <MiniIdeaCard/>
            <MiniIdeaCard/>
            <MiniIdeaCard/>
            <MiniIdeaCard/>
          </div>      
        </div>
        
        {/* Main Content */}
        <div className="home-main-content-container">  
          <div className="home-main-content">
            <h2>Hello, <b>Username</b>.</h2>
            <p>Welcome back. Here, you can find a quick summary of your bookmarked and standout-ideas, 
              while staying up to date with the newest forum posts</p>
            <h3>Bookmarked Ideas</h3>
            <hr />
            <div className="bookmark-card-container">
              <div className="bookmark-main-container">
              {ideaDummyData.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  id={idea.id}
                  title={idea.title}
                  description={idea.description}
                  projectFeatures={idea.projectFeatures}
                  dayGenerated={idea.dayGenerated}
                  impact={idea.impact}
                  feasibility={idea.feasibility}
                  difficulty={idea.difficulty}
                  category={idea.category}
                  bookmarked={idea.bookmarked}
                />
              ))}                
              </div>
            </div>
            <h3>New Posts</h3>
            <hr />
            <div className="recent-post-container">
              <MiniPostCard/>
              <MiniPostCard/>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
