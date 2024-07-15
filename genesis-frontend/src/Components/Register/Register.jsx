import React from 'react';
import './Register.css';
import landing_image from '../../assets/svg/organizing_projects.png';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <div className="register-info">
            <div className="register-user-info">
              <h2 className="register-header">Sign up</h2>
              <p className="register-to-login">Already a member? <a href="/login">Log in now</a></p>
              <form action="/action_page.php">
                <input type="text" id="username" name="username" placeholder='Username'/>
                <input type="text" id="email" name="email" placeholder='Email'/>
                <input type="text" id="email" name="email" placeholder='Password'/>
                <input type="text" id="email" name="email" placeholder='Confirm Password'/>
              </form>
            </div>
            <Link to="/home" className="register-button">Sign up</Link>

          </div>
          <img className="register-image" src={landing_image} alt="Project Action" />
        </div>
      </div>
    </>
  );
};

export default Register;
