import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
	const { userId, isLoaded } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoaded && !userId) {
			navigate("/register");
		}
	}, [isLoaded]);

	if (!isLoaded) {
		return "Loading...";
	}

	return <Outlet />;
}
