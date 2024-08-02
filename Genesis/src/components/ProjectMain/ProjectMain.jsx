import './ProjectMain.css';
import Brainstorm from '../Brainstorm/Brainstorm';
import React, { useState, useEffect } from 'react';
// import CreateProject from '../ProjectMain/CreateProject/CreateProject';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const ProjectMain = () => {
	const [userProjects, setUserProjects] = useState([]);
	const { user } = useUser();

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				if (user) {
					const response = await axios.get(`${import.meta.env.VITE_GENESIS_API_PROD_URL}/projects/owner/${user.id}`);
					// Log the response data to ensure it's an array
					console.log(response.data);
					if (Array.isArray(response.data)) {
						setUserProjects(response.data);
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
			<button>create a project</button>
			{/* <Brainstorm/> */}

			{/* User Projects */}
			<div className="project-items-container">
				{Array.isArray(userProjects) && userProjects.length > 0 ? (
					userProjects.map((project, index) => (
						<div key={index} className="project-card">
							<p>{project.title}</p>
							<p>{project.owner.username}</p>
							<p>Ideas: {project.ideas.length}</p>
						</div>
					))
				) : (
					<p>You have no projects. Create one to get started.</p>
				)}

				{/* <CreateProject /> */}
				
			</div>
		</div>
	);
}

export default ProjectMain;
