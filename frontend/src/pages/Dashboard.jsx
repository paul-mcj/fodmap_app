import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Dashboard() {
	const { state } = useLocation();
	const navigate = useNavigate();
	const user = state?.user;

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await axios.post(
				"http://127.0.0.1:8000/api/users/logout/",
				{},
				{ withCredentials: true }
			);

			// Clear local app state and navigate home
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
