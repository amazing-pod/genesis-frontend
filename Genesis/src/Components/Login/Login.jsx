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
					{/* <div className="login-info">
						<div className="login-user-info">
							<h2 className="login-header">Login</h2>
							<p className="login-to-register">
								Not a member? <a href="/register">Register now</a>
							</p>
							<form autoComplete="off">
								<input
									type="text"
									id="username"
									name="username"
									placeholder="Username"
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
								<input
									type="password"
									id="password"
									name="password"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</form>
						</div>
						<p onClick={handleLogin} className="login-button">
							Login
						</p>
					</div> */}
					<SignIn />
					<img
						className="register-image"
						src={login_image}
						alt="Project Action"
					/>
				</div>
			</div>
		</>
	);
};

export default Login;
