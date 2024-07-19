import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import landing_image from "../../assets/svg/organizing_projects.png";
import axios from "axios";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmedPassword, setConfirmedPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			if (password !== confirmedPassword) {
				throw new Error("Passwords do not match.");
			}

			const registerResponse = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_BASE_URL}/users/register`,
				{ username, email, password }
			);

			const loginResponse = await axios.post(
				`${import.meta.env.VITE_GENESIS_API_BASE_URL}/users/login`,
				{ username, password }
			);

			localStorage.setItem("token", loginResponse.data.token);
			navigate("/home");
		} catch (error) {
			alert(`Error: ${error.message}`);
		}
	};

	return (
		<>
			<div className="register-page">
				<div className="register-container">
					{/* <div className="register-info">
						<div className="register-user-info">
							<h2 className="register-header">Sign up</h2>
							<p className="register-to-login">
								Already a member? <a href="/login">Log in now</a>
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
									type="text"
									id="email"
									name="email"
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
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
								<input
									type="password"
									id="confirm-password"
									name="confirm-password"
									placeholder="Confirm Password"
									onChange={(e) => setConfirmedPassword(e.target.value)}
									required
								/>
							</form>
						</div>
						<p onClick={handleRegister} className="register-button">
							Sign up
						</p>
					</div> */}
					<SignUp />
					<img
						className="register-image"
						src={landing_image}
						alt="Project Action"
					/>
				</div>
			</div>
		</>
	);
};

export default Register;
