import './ProjectMain.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import delete_icon from "../../assets/png/delete_icon.png";
import delete_active_icon from "../../assets/svg/delete_active_icon.svg"
import { useUser } from '@clerk/clerk-react';

const ProjectMain = () => {
    const [userProjects, setUserProjects] = useState([]);
    const { user } = useUser();
    const [title, setTitle] = useState('');
    console.log(user);

    const deleteProject = async (id) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_GENESIS_API_URL}/projects/${id}`
            );
            console.log("Project deleted:", response);
            
            // Fetch updated projects list after deletion
            fetchProjects();
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const createNewProject = async (event) => {
        event.preventDefault();

        try {
            console.log(title, user.id);
            const response = await axios.post(
                `${import.meta.env.VITE_GENESIS_API_URL}/projects`,
                { ownerId: user.id, title: title }
            );
            setTitle('');
            console.log("Project created:", response);

            // Fetch updated projects list
            fetchProjects();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };


    useEffect(() => {
		const fetchProjects = async () => {
			try {
				if (user) {
					const response = await axios.get(`${import.meta.env.VITE_GENESIS_API_PROD_URL}/projects`);
					const responseData = response.data;
					console.log("original response data:", response.data);
					if (Array.isArray(responseData)) {
						setUserProjects(responseData.filter(project => project.owner.id === user.id));
					} else {
						console.error('Expected an array but received:', responseData);
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
                </div>

                {/* Creating a new project */}
                <form className="new-project-info" onSubmit={createNewProject}>
                    <input
                        type="text"
                        name="project-title"
                        placeholder="Enter your project title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <button type="submit">Add new Project</button>
                </form>

                {/* User Projects */}
                <div className="user-project-container">
                    <hr className='project-divider'/>
                    <div className="project-row-info">
                        <h2 className='project-index'>#</h2>
                        <h2 className='project-title'>Project Title</h2>
                    </div>
                    <hr />

                    {userProjects.length > 0 ? (
                        userProjects.map((project, index) => (
                            <div key={project.id} className="project-row">
                                <p className="project-index">{index + 1}</p>
                                <h2 className="project-title">{project.title}</h2>
                                <img 
                                    className="project-delete" 
                                    src={delete_icon} 
                                    alt="delete-icon" 
                                    onClick={() => deleteProject(project.id)}
                                />
                            </div>
                        ))
                    ) : (
                        // <p>No projects found for this user.</p>
						null
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectMain;
