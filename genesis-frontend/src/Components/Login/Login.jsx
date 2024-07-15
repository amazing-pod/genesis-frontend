import React from 'react';
import "./Login.css";
import project_collaboration_image from "../../assets/svg/landing_project_collaboration.svg"
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Login = () => {
  return (
    <>
    <Box>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TextField id="filled-basic" label="Filled" variant="filled" />
    <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
    <p>Login</p>

    </>
  );
};

export default Login;








