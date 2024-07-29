import React, { useState } from 'react';
import './CreatePost.css';

const CreatePost = ({ onCreatePost }) => {
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username && title && content) {
      const newPost = {
        id: Date.now(),
        userProfilePhoto: "https://placehold.co/50x50", // Default profile photo
        username,
        timeAgo: "Just now", // Placeholder time
        title,
        content,
        likes: 0,
        comments: [],
        tags: []
      };
      onCreatePost(newPost);
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
          name="username"
          placeholder=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="button" className="cancel-button" onClick={() => {
          setUsername('');
          setTitle('');
          setContent('');
        }}>Cancel</button>
      </div>
    </form>
  );
};

export default CreatePost;
