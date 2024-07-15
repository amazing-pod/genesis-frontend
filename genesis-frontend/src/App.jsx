import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { useState } from 'react'
// Components
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from './Components/Register/Register';


function App() {

  return (
    <>
    {/* <AuthProvider> */}
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
					{/* <Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/home" element={<Home />} />
					<Route path="/boards/:boardId" element={<Board />} /> */}
				</Routes>
			</BrowserRouter>
		{/* </AuthProvider> */}

    </>
  )
}

export default App
