import React, { useState, useEffect } from 'react';
import './Community.css';
import Header from '../Shared/Header/Header';
import MiniNavbar from "../Shared/MiniNavbar/MiniNavbar"
import ForumPost from './ForumPost/ForumPost';

const Community = () => {

  /*
  Items to pass onto component:
  1. Placeholder text (Category)
  2. Array of category items
  3. Pass in "New Post +" text
  4. Pass in function to show modal
  
  */
  return (
    <>
      <Header />
      <div className="community-page-container">
      <MiniNavbar/>
      <h3>Most Recent Posts</h3>
      <hr/>
      {/* Potential functionality: Have a load more button, which loads more post items */}
        <ForumPost/>
        <ForumPost/>
        <ForumPost/>
      </div>
      


      {/* Using {filter} will allow you to access the filtered dropdown option */}
      {/* <p>Selected Filter: {filter}</p> */}
    </>
  );
};

export default Community;
