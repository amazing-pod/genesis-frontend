import './ProjectMain.css';
import Brainstorm from '../Brainstorm/Brainstorm';
import React, { useState, useEffect } from 'react';
import CreateProject from './CreateProject/CreateProject';
import axios from 'axios';
import delete_icon from "../../assets/png/delete_icon.png";
import { useUser } from '@clerk/clerk-react';

const ProjectMain = () => {
	const [userProjects, setUserProjects] = useState([]);
	const { user } = useUser();

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				if (user) {
					const response = await axios.get(`${import.meta.env.VITE_GENESIS_API_PROD_URL}/projects`);
					const responseData = response.data;
					if (Array.isArray(response.data)) {
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
		<div className="project-main-container">
			<div className="project-page-container">
				<div className="project-header">
					<h2>All Projects</h2>
					<button className='project-add'>Add new project</button>
				</div>

				{/* Creating a new project: */}
				<form className="new-project-info">
					<input type="text" placeholder="Enter your project title here..."required/>
					<button>create new project</button>
				</form>
				{/* <CreateProject /> */}
				{/* <Brainstorm/> */}

				{/* User Projects */}
				<div className="user-project-container">
					<div className="project-table">
						<div className="project-row">
							<h2 className='project-index'>#</h2>
							<h2 className='project-title'>Project Title</h2>
							<div></div> {/* Placeholder for delete icon column */}
						</div>
						{userProjects.length > 0 ? (
							userProjects.map((project, index) => (
								<div key={project.id} className="project-row">
									<p className="project-index">{index + 1}</p>
									<h2 className="project-title">{project.title}</h2>
									<img className="project-delete" src={delete_icon} alt="delete-icon" />
								</div>
							))
						) : (
							<p>No projects found for this user.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectMain;
