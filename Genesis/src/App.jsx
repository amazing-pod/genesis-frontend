import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { useState } from "react";
// Components
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Community from "./components/Community/Community";
import Brainstorm from "./components/Brainstorm/Brainstorm";
import PostDetails from './components/Community/ForumPost/PostDetails';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/home" element={<Home />} />
				<Route path="/community" element={<Community />} />
        <Route path="/community/post/:id" element={<PostDetails />} />
				<Route path="/brainstorm" element={<Brainstorm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
