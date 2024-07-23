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
          <button type="submit" className="submit-button">Post</button>
          <button className='cancel-button'>Cancel</button>
      </div>
      </form>
  );
};

export default CreatePost;

