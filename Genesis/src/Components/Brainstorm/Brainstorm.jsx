import React from 'react';
import './Brainstorm.css';
import dropdown_icon from "../../assets/png/dropdown_icon.png"
import bookmark_inactive_icon from "../../assets/png/bookmark_inactive.png";
import bookmark_active_icon from "../../assets/png/bookmark_active.png";
import IdeaCard from './IdeaCard/IdeaCard';

const Brainstorm = () => {

  function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  return (
    <>
      <h2>My Ideas</h2>
      {/* Mini-Navbar */}
      <div className="mini-navbar">
      {/* Dropdown */}
      <div class="dropdown">
      <button onClick={myFunction} className="dropbtn">Sort by...</button>
      <div id="myDropdown" class="dropdown-content">
        <p>Most Recent</p>
        <p>Most Impact</p>
        <p>Most Feasible</p>
        <p>Most Difficult</p>
        <p>Easiest</p>
      </div>
    </div>


      {/* Add a new idea */}
      <p>New idea +</p>
      </div>
    <div className="idea-card-container">
      <IdeaCard/>
      <IdeaCard/>
      <IdeaCard/>
      <IdeaCard/>
    </div>
    </>
  );
};

export default Brainstorm;
