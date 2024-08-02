import React, { useState } from "react";
import "./CreatePost.css";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const CreatePost = ({ onCreatePost, onCancel }) => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const { user } = useUser();

	const handleSubmit = (event) => {
		event.preventDefault();

		const trimmedTitle = title.trim();
		const trimmedContent = content.trim();

		if (trimmedTitle && trimmedContent) {
			const createPost = async () => {
				const response = await axios.post(
					`${import.meta.env.VITE_GENESIS_API_URL}/threads/posts`,
					{
						title: trimmedTitle,
						authorId: user.id,
						content: trimmedContent,
						category: "Random",
						tags: [],
					}
				);
				console.log(response.data);
			};
			createPost();
			setTitle("");
			setContent("");
			onCancel();
		}
	};

	return (
		<form className="create-post-form" onSubmit={handleSubmit}>
			<div className="create-post-form-content">
				<input
					type="text"
					name="title"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<hr />
				<textarea
					name="content"
					placeholder="Enter content here..."
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
				/>
			</div>
			<div className="create-post-footer">
				<button type="submit" className="submit-button">
					Post
				</button>
				<button
					type="button"
					className="cancel-button"
					onClick={() => {
						setTitle("");
						setContent("");
						onCancel();
					}}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default CreatePost;
