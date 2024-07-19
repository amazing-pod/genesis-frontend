import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ onCreatePost }) => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onCreatePost function passed as a prop
    if (username && title && content) {
      onCreatePost({ username, title, content });
      // Reset form fields
      setUsername('');
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="create-post-container">
      <h4>Create New Post</h4>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          
        </div>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

