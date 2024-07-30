import React, { useState } from "react";
import "./Login.css";
import login_image from "../../assets/png/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
	return (
		<>
			<div className="login-page">
				<div className="login-container">
					<SignIn />
					<img className="login-image" src={login_image} alt="Project Action" />
				</div>
			</div>
		</>
	);
};

export default Login;
