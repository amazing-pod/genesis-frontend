import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import register_image from "../../assets/svg/organizing_projects.png";
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
			<SignUp />
			<img className="register-image" src={register_image} alt="Project Action"/>
		</div>
	</div>
	</>
	);
};

export default Register;
