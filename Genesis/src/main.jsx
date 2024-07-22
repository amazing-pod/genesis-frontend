import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./Components/Landing/Landing.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Home from "./Components/Home/Home.jsx";
import Community from "./Components/Community/Community.jsx";
import Brainstorm from "./Components/Brainstorm/Brainstorm.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
	{
		element: <RootLayout />,
		children: [
			{ path: "/", element: <Landing /> },
			{ path: "/login/*", element: <Login /> },
			{ path: "/register/*", element: <Register /> },
			{
				element: <ProtectedLayout />,
				children: [
					{ path: "/home", element: <Home /> },
					{ path: "/community", element: <Community /> },
					{ path: "/brainstorm", element: <Brainstorm /> },
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
