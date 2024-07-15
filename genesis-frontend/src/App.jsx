import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { useState } from 'react'
// Components
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";
import Community from "./Components/Community/Community";
import Brainstorm from "./Components/Brainstorm/Brainstorm"

function App() {

	return (
    <>
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/home" element={<Home />} />
			<Route path="/community" element={<Community />} />
			<Route path="/brainstorm" element={<Brainstorm />} />
		</Routes>
	</BrowserRouter>
    </>
	)
}

export default App
