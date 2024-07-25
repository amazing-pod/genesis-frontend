import React, { useState, useEffect } from 'react';
import './Brainstorm.css';
import IdeaCard from './IdeaCard/IdeaCard';
import ViewIdeaModal from './ViewIdeaModal/ViewIdeaModal';
import dropdown_icon from '../../assets/png/dropdown_icon.png';
import CreatePost from '../Community/ForumPost/CreatePost';
import IdeationModal from './IdeationModal/IdeationModal';

const Brainstorm = () => {
  const [ideaDummyData, setIdeaDummyData] = useState([
    {
      id: 1,
      title: "Smart Home Automation",
      description: "Automate various home devices and appliances using IoT technology.",
      projectFeatures: ["Motion detection lights", "Temperature control", "Smart locks"],
      dayGenerated: "2023-07-15",
      impact: 4,
      feasibility: 3,
      difficulty: 2,
      category: "Technology",
      bookmarked: false,
    },
    {
      id: 2,
      title: "Community Garden Initiative",
      description: "Create a community garden to promote sustainable living and local food production.",
      projectFeatures: ["Raised beds", "Compost station", "Education workshops"],
      dayGenerated: "2023-07-14",
      impact: 5,
      feasibility: 4,
      difficulty: 3,
      category: "Environment",
      bookmarked: true,
    },
    {
      id: 3,
      title: "Mobile App for Senior Citizens",
      description: "Develop an intuitive mobile app catering to the needs of elderly people.",
      projectFeatures: ["Large font size", "Voice navigation", "Emergency contacts"],
      dayGenerated: "2023-07-13",
      impact: 3,
      feasibility: 5,
      difficulty: 2,
      category: "Healthcare",
      bookmarked: false,
    },
    {
      id: 4,
      title: "Online Learning Platform",
      description: "Build a platform offering courses and tutorials in various subjects.",
      projectFeatures: ["Video lectures", "Interactive quizzes", "Progress tracking"],
      dayGenerated: "2023-07-12",
      impact: 4,
      feasibility: 4,
      difficulty: 3,
      category: "Education",
      bookmarked: true,
    },
    {
      id: 5,
      title: "Local Artisan Marketplace",
      description: "Create an online marketplace to support local artisans and craftsmen.",
      projectFeatures: ["Seller profiles", "Product listings", "Secure payment gateway"],
      dayGenerated: "2023-07-11",
      impact: 3,
      feasibility: 4,
      difficulty: 2,
      category: "Commerce",
      bookmarked: false,
    },
    {
      id: 6,
      title: "Green Energy Solutions",
      description: "Implement renewable energy solutions to reduce carbon footprint in urban areas.",
      projectFeatures: ["Solar panel installations", "Wind turbine farms", "Energy-efficient buildings"],
      dayGenerated: "2023-07-10",
      impact: 5,
      feasibility: 3,
      difficulty: 4,
      category: "Environment",
      bookmarked: true,
    },
  ]);

  const MiniNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filter, setFilter] = useState('Category');
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [ideas, setIdeas] = useState(ideaDummyData);
    const [sortedIdeas, setSortedIdeas] = useState([]);

    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

    const handleDropdownItemClick = (filterName) => {
      setFilter(filterName);
      setDropdownOpen(false);
      sortIdeas(filterName);
    };

    const handleOutsideClick = (event) => {
      if (!event.target.closest('.dropdown') && dropdownOpen) {
        setDropdownOpen(false);
      }
    };

    useEffect(() => {
      window.addEventListener('click', handleOutsideClick);
      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }, [dropdownOpen]);

    useEffect(() => {
      sortIdeas(filter);
    }, [filter, ideas]);

    const sortIdeas = (filter) => {
      let sorted = [...ideas];
      if (filter === 'Oldest') {
        sorted.sort((a, b) => new Date(a.dayGenerated) - new Date(b.dayGenerated));
      } else if (filter === 'Newest') {
        sorted.sort((a, b) => new Date(b.dayGenerated) - new Date(a.dayGenerated));
      } else if (filter === 'Most Liked') {
        sorted.sort((a, b) => b.impact - a.impact); // Assuming 'impact' is a proxy for likes
      }
      setSortedIdeas(sorted);
    };

    return (
      <>
        <div className="mini-navbar">
          <div className="dropdown">
            <div className="dropdown-view">
              <button onClick={toggleDropdown} className="dropbtn">
                {filter}
                <img className="dropdown-icon" src={dropdown_icon} alt="dropdown icon" />
              </button>
            </div>
            <div id="myDropdown" className={`dropdown-content ${dropdownOpen ? 'show' : ''}`}>
              <p onClick={() => handleDropdownItemClick('Newest')}>Newest</p>
              <p onClick={() => handleDropdownItemClick('Oldest')}>Oldest</p>
              <p onClick={() => handleDropdownItemClick('Most Liked')}>Most Liked</p>
            </div>
          </div>
          <p className="new-post" onClick={() => setShowCreatePost(!showCreatePost)}> +</p>
        </div>
        {showCreatePost && <CreatePost />}
        <div className="posts-container">
          {sortedIdeas.map(idea => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
           
        </div>
      </>
    );
  };

  const [selectedIdea, setSelectedIdea] = useState(null);
  const [openIdeationModal, setOpenIdeationModal] = useState(false);

  const toggleIdeationModal = () => {
    setOpenIdeationModal(!openIdeationModal);
  };

  const openModalForId = (ideaId) => {
    setSelectedIdea(ideaId);
  };

  const closeModal = () => {
    setSelectedIdea(null);
  };

  const handleSave = (updatedIdea) => {
    const updatedIdeas = ideaDummyData.map(idea => {
      if (idea.id === updatedIdea.id) {
        return updatedIdea;
      }
      return idea;
    });
    setIdeaDummyData(updatedIdeas);
    closeModal();
  };

  return (
    <div className="user-idea-container">
      <MiniNavbar />
      {selectedIdea !== null ? (
        <ViewIdeaModal
          idea={ideaDummyData.find(idea => idea.id === selectedIdea)}
          closeModal={closeModal}
          onSave={handleSave}
        />
      ) : (
        <>
          <h2>My Ideas</h2>
          <hr />
          <p onClick={toggleIdeationModal} className="my-ideas-plus">My ideas +</p>
          <div className="idea-card-container">
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
                openModal={openModalForId}
              />
            ))}
          </div>
          {openIdeationModal && <IdeationModal closeModal={toggleIdeationModal} />}
        </>
      )}
    </div>
  );
};

export default Brainstorm;


