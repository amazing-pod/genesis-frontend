import React from 'react';
import './Home.css';
// Component Imports
import Header from '../Shared/Header/Header';
import MiniIdeaCard from './MiniIdeaCard/MiniIdeaCard';
import IdeaCard from '../Brainstorm/IdeaCard/IdeaCard';
import MiniPostCard from './MiniPostCard/MiniPostCard';

const Home = () => {
  
  return (
    <>
      <Header />
      <div className="home-page-container">
        {/* Sidebar Content */}
        <div className="home-sidebar-container">
          <h3>Idea Highilights</h3>
          <hr />
          <div className="mini-idea-container">
            <MiniIdeaCard/>
            <MiniIdeaCard/>
            <MiniIdeaCard/>
            <MiniIdeaCard/>
          </div>

        </div>
        <div className="home-page-main-content-container">
        <div className="home-main-container">
          <h2>Good morning, Username.</h2>
          <p>Here, you can find a quick summary of your bookmarked and standout-ideas, along
          with the newest forum posts</p>

          <h3>Bookmarked Ideas</h3>
          <hr />

          <div className="bookmark-card-container">
            <IdeaCard/>
            <IdeaCard/>
            <IdeaCard/>
            <IdeaCard/>
          </div>


          {/* Replace with 1st and 2nd bookmarked items?  */}
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
