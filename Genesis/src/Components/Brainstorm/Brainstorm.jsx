import React, { useState } from 'react';
import './Brainstorm.css';
import IdeaCard from './IdeaCard/IdeaCard';
import IdeationModal from './IdeationModal/IdeationModal';
import ViewIdeaModal from './ViewIdeaModal/ViewIdeaModal';
const Brainstorm = () => {
  const ideaDummyData = [
    {
      id: 1,
      title: "Smart Home Automation",
      description: "Automate various home devices and appliances using IoT technology.",
      projectFeatures: [
        "Motion detection lights",
        "Temperature control",
        "Smart locks"
      ],
      dayGenerated: "2023-07-15", // Date generated in ISO format
      impact: 4,
      feasibility: 3,
      difficulty: 2,
      category: "Technology",
      bookmarked: false
    },
    {
      id: 2,
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
      id: 3,
      title: "Mobile App for Senior Citizens",
      description: "Develop an intuitive mobile app catering to the needs of elderly people.",
      projectFeatures: [
        "Large font size",
        "Voice navigation",
        "Emergency contacts"
      ],
      dayGenerated: "2023-07-13",
      impact: 3,
      feasibility: 5,
      difficulty: 2,
      category: "Healthcare",
      bookmarked: false
    },
    {
      id: 4,
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
      id: 5,
      title: "Local Artisan Marketplace",
      description: "Create an online marketplace to support local artisans and craftsmen.",
      projectFeatures: [
        "Seller profiles",
        "Product listings",
        "Secure payment gateway"
      ],
      dayGenerated: "2023-07-11",
      impact: 3,
      feasibility: 4,
      difficulty: 2,
      category: "Commerce",
      bookmarked: false
    },
    {
      id: 6,
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
    }
  ];

  const [modalOpenForId, setModalOpenForId] = useState(null);

  const openModalForId = (ideaId) => {
    setModalOpenForId(ideaId);
  };

  const closeModal = () => {
    setModalOpenForId(null);
  };

  return (
    <>
      <div className="user-idea-container">
        <h2>My Ideas</h2>
        <hr />
        <div className="idea-card-container">
          {ideaDummyData.map((idea) => (
            <IdeaCard 
              key={idea.id}
              id={idea.id} // Pass id to IdeaCard
              title={idea.title}
              description={idea.description}
              projectFeatures={idea.projectFeatures}
              dayGenerated={idea.dayGenerated}
              impact={idea.impact}
              feasibility={idea.feasibility}
              difficulty={idea.difficulty}
              category={idea.category}
              bookmarked={idea.bookmarked}
              openModal={openModalForId} // Pass openModal function
            />
          ))}
        </div>
        {modalOpenForId && (
          <ViewIdeaModal 
            idea={ideaDummyData.find(idea => idea.id === modalOpenForId)} // Pass the specific idea
            closeModal={closeModal} 
          />
        )}
      </div>
    </>
  );
};

export default Brainstorm;
