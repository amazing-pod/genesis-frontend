import React, { useState } from 'react';
import './UserProfile.css';
import profile_photo from "../../../assets/png/profile_photo.png";

const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img htmlFor="photo-upload" src={src} alt="User" />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Name = ({ onChange, value }) => (
  <div className="field">
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
  <div className="field">
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
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img htmlFor="photo-upload" src={src} alt="User" />
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="bio">{bio}</div>
      <button type="submit" className="edit">Edit Profile</button>
    </form>
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Edit Profile</h1>
      {children}
      <button type="submit" className="save">Save</button>
    </form>
  </div>
);

const UserProfile = () => {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState(profile_photo);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [active, setActive] = useState('edit');

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

  return (
    <>
    <div className="user-profile-page-container">
    <div className='user-profile-page'>
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
    </>
  );
};

export default UserProfile;
