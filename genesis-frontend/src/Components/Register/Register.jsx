import React from 'react';
import './Register.css';
import landing_image from '../../assets/svg/organizing_projects.png';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Register = () => {
  return (
    <>
      <div className="register-page">
        <div className="register-container">
          <div className="register-user-info">
          <form action="/action_page.php">
            <input type="text" id="username" name="username" placeholder='Username'/>
            <input type="text" id="username" name="username" placeholder='Email'/>
            <input type="text" id="username" name="username" placeholder='Password'/>
            <input type="text" id="username" name="username" placeholder='Confirm Password'/>
          </form>
          <button className="register-button">Sign Up</button>            
          </div>

          
          {/* <Box className="register-user-info">
            <h2>Sign Up</h2>
            <p className="register-to-login">Already a member? <span className="sign-up">Log in now</span></p>

            <TextField
              id="outlined-username"
              label="Username"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter, sans-serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Inter, sans-serif',
                },
              }}
            />
            <TextField
              id="outlined-email"
              className="hi"
              label="Email"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter, sans-serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Inter, sans-serif',
                },
              }}
            />
            <TextField
              id="outlined-password"
              label="Password"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter, sans-serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Inter, sans-serif',
                },
              }}
            />
            <TextField
              id="outlined-confirm-password"
              label="Confirm Password"
              variant="outlined"
              sx={{
                '& .MuiInputBase-input': {
                  fontFamily: 'Inter, sans-serif',
                },
                '& .MuiInputLabel-root': {
                  fontFamily: 'Inter, sans-serif',
                },
              }}
            />
          </Box> */}
          <img className="register-image" src={landing_image} alt="Project Organization" />
        </div>
      </div>
    </>
  );
};

export default Register;
