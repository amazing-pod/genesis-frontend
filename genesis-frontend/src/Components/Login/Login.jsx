import React from 'react';
import './Login.css'
import login_image from '../../assets/png/login.png';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-info">
            <div className="login-user-info">
              <h2 className="login-header">Login</h2>
              <p className="login-to-register">Not a member? <a href="/register">Register now</a></p>
              <form action="/action_page.php">
                <input type="text" id="username" name="username" placeholder='Username'/>
                <input type="text" id="email" name="email" placeholder='Email'/>
              </form>
            </div>
            <Link to="/home" className="login-button">Login</Link>

          </div>
          <img className="register-image" src={login_image} alt="Project Action" />
        </div>
      </div>
    </>
  );
};

export default Login;
