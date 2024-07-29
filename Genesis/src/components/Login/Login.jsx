import React, { useState } from "react";
import "./Login.css";
import login_image from "../../assets/png/login.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		try {
			const response = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_BASE_URL}/users/login`,
				{ username, password }
			);
			localStorage.setItem("token", response.data.token);
			navigate("/home");
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	};

	return (
		<>
			<div className="login-page">
				<div className="login-container">
					<SignIn />
					<img className="login-image" src={login_image} alt="Project Action"
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
