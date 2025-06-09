import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../utils/api_req";

const Navbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		// verify user is authenticated to view dashboard, otherwise the browser might load a cached version of the page even if user logged out and cookies were cleared
		const verifyUser = async () => {
			try {
				(await getUser()) && setIsAuthenticated(() => true);
			} catch (err) {
				setIsAuthenticated(() => false);
				console.error(
					"Verification failed:",
					err?.response?.data?.detail || err.message
				);
			}
		};
		verifyUser();
	}, []);

	return (
		<nav>
			<Link to="/">Home</Link>
			{isAuthenticated && <Link to="/dashboard">Dashboard</Link>}
			<Link to="/login">Login</Link>
			<Link to="/register">Signup</Link>
		</nav>
	);
};

export default Navbar;
