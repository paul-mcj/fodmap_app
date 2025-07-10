import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function RequireAuth({ children }) {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		// TODO: spinner component.
		return <p>Loading authentication status...</p>;
	}

	if (!user) {
		// Redirect to login and save current location
		return (
			<Navigate
				to="/login"
				state={{ from: location }}
				replace
			/>
		);
	}

	// User authenticated
	return children;
}
