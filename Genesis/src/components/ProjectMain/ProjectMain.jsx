import './ProjectMain.css';
import Brainstorm from '../Brainstorm/Brainstorm';
import React, { useState, useEffect } from 'react';
import CreateProject from './CreateProject/CreateProject';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const ProjectMain = () => {
	const [userProjects, setUserProjects] = useState([]);
	const { user } = useUser();

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				if (user) {
					const response = await axios.get(`${import.meta.env.VITE_GENESIS_API_PROD_URL}/projects`);
					// Log the response data to ensure it's an array
					const responseData = response.data;
					console.log(response.data);
					if (Array.isArray(response.data)) {
						let test = responseData.filter(project => project.ownerId === user.id);
						console.log("test", test);

						setUserProjects(responseData.filter(project => project.owner.id === user.id));
					} else {
						console.error('Expected an array but received:', response.data);
						setUserProjects([]);
					}
				}
			} catch (error) {
				console.error("Error fetching projects:", error);
				setUserProjects([]);
			}
		};

		fetchProjects();
	}, [user]);

	return (
		<div className="project-page-container">
			<CreateProject />

			{/* <Brainstorm/> */}

			{/* User Projects */}
			<div className="project-items-container">
            {userProjects.length > 0 ? (
                userProjects.map(project => (
                    <div key={project.id}>
                        <h2>{project.title}</h2>
                        <p>Owner: {project.owner.username}</p>
                        <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
                        {/* Display additional project details as needed */}
                        {/* For example, displaying ideas */}
                        <h3>Ideas:</h3>
                        <ul>
                            {project.ideas.map(idea => (
                                <li key={idea.id}>{idea.title}</li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No projects found for this user.</p>
            )}
				
			</div>
		</div>
	);
}

export default ProjectMain;
