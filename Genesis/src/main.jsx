import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import Community from "./components/Community/Community.jsx";
import Brainstorm from "./components/Brainstorm/Brainstorm.jsx";
import ProtectedLayout from "./layouts/ProtectedLayout.jsx";
import RootLayout from "./layouts/RootLayout.jsx";
import UserProfile from "./components/Shared/UserProfile/UserProfile.jsx";
import PostDetails from "./components/Community/ForumPost/PostDetails.jsx";
import { DropdownProvider } from "./context/DropdownContext.jsx";
import { ProjectProvider } from "./context/ProjectContext.jsx";
import { IdeasProvider } from "./context/IdeasContext.jsx";

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
					{ path: "/user-profile", element: <UserProfile /> },
					{ path: "/community", element: <Community /> },
					{ path: "/community/threads/:id", element: <PostDetails /> },
					{ path: "/brainstorm", element: <Brainstorm /> },
				],
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ProjectProvider>
			<IdeasProvider>
				<DropdownProvider>
					<RouterProvider router={router} />
				</DropdownProvider>
			</IdeasProvider>
		</ProjectProvider>
	</React.StrictMode>
);
