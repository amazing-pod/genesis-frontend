import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import profile_photo from "../../../assets/png/profile_photo.png";
import close_icon from "../../../assets/png/close.png";
import { useNavigate, useLocation } from 'react-router-dom';

const ImgUpload = ({ onChange, src }) => (
  <div className="custom-file-upload fas">
    <div className="img-wrap img-upload" onClick={() => document.getElementById('photo-upload').click()}>
      <img src={src} alt="User" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} style={{ display: 'none' }} />
  </div>
);

const Name = ({ onChange, value }) => (
  <div className="user-info-field">
    <label htmlFor="name">Name:</label>
    <input
      id="name"
      type="text"
      onChange={onChange}
      maxLength="25"
      value={value}
      placeholder="Alexa"
      required
    />
  </div>
);

const Bio = ({ onChange, value }) => (
  <div className="user-info-field">
    <label htmlFor="bio">Bio:</label>
    <input
      id="bio"
      type="text"
      onChange={onChange}
      maxLength="3000"
      value={value}
      placeholder="It's a nice day!"
      required
    />
  </div>
);

const Profile = ({ onSubmit, src, name, bio }) => (
  <div className="user-profile-card">
    <form className='user-profile-form' onSubmit={onSubmit}>
      <h2>Profile Card</h2>
      <div className="custom-file-upload fas">
        <div className="img-wrap">
          <img src={src} alt="User" />
        </div>
      </div>
      <div className="name">{name}</div>
      <div className="bio">{bio}</div>
      <button type="submit" className="edit">Edit Profile</button>
    </form>
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="user-profile-card">
    <form onSubmit={onSubmit}>
      <h2>Edit Profile</h2>
      <p> {children} </p>
      <button type="submit" className="save-user-profile">Save</button>
    </form>
  </div>
);

const UserProfile = () => {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profile_photo);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [active, setActive] = useState('edit');
  const navigate = useNavigate();
  const location = useLocation();

  const { previousPath } = location.state || { previousPath: null };

  useEffect(() => {
  }, [previousPath]);

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const editName = (e) => setName(e.target.value);

  const editBio = (e) => setBio(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active === 'edit' ? 'profile' : 'edit');
  };

  const handleBack = () => {
    if (previousPath) {
      navigate(previousPath); // Navigate back to the previous path
    } else {
      navigate('/home'); // Default fallback route if no previousPath is found
    }
  };

  return (
    <div className="user-profile-page-container">
      <div className='user-profile-page'>
        <img src={close_icon} alt="close" onClick={handleBack} />
        {active === 'edit' ? (
          <Edit onSubmit={handleSubmit}>
            <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
            <Name onChange={editName} value={name} />
            <Bio onChange={editBio} value={bio} />
          </Edit>
        ) : (
          <Profile
            onSubmit={handleSubmit}
            src={imagePreviewUrl}
            name={name}
            bio={bio}
          />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
