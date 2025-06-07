import { useNavigate } from "react-router-dom";
import { logout } from "../utils/api_req";
import { useEffect } from "react";
import { getUser } from "../utils/api_req";
import Navbar from "../components/Navbar";
import { useState } from "react";

function Dashboard() {
	// const { state } = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	useEffect(() => {
		// verify user is authenticated to view dashboard, otherwise the browser might load a cached version of the page even if user logged out and cookies were cleared
		const verifyUser = async () => {
			try {
				const userInfo = await getUser();
				setUser(() => userInfo.data);
			} catch (err) {
				console.error(
					"Verification failed:",
					err?.response?.data?.detail || err.message
				);
				navigate("/login"); // force to login page if auth fails
			}
		};
		verifyUser();
	}, []);

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await logout();

			// TODO: Clear local app state (if its put into context API or useState later)
			// navigate home
			navigate("/");
		} catch (err) {
			console.error(
				"Login failed:",
				err?.response?.data?.detail || err.message
			);
		}
	};

	if (!user) return <p>Loading...</p>; // or redirect if needed

	return (
		<div>
			<Navbar />
			<h1>Welcome, {user.username}!</h1>
			<p>Bio: {user.bio || "No bio yet."}</p>
			<button
				type="submit"
				onClick={handleLogout}>
				Log Out
			</button>
		</div>
	);
}

export default Dashboard;
