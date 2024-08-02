import './CreateProject.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const CreateProject = () => {
	const [title, setTitle] = useState('');
	const { user } = useUser();
    console.log(user);
    
	const createNewProject = async (event) => {
        event.preventDefault();

        try {
            let userID = user.id;
            console.log("user ID:", userID);
            console.log(title, user.id);
            const response = await axios.post(
                `${import.meta.env.VITE_GENESIS_API_URL}/projects`,
                { ownerId: user.id, title: title }
            );
            setTitle('');
            console.log("response:", response);
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

	return (
        <form className="create-project-container" onSubmit={createNewProject}>
            <h2>Add new project:</h2>
            <input
                type="text"
                name="project-title"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
	);
}

export default CreateProject;
