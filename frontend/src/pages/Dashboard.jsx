import { useLocation } from "react-router-dom";

function Dashboard() {
	const { state } = useLocation();
	const user = state?.user;

	if (!user) return <p>Loading...</p>; // or redirect if needed

	return (
		<div>
			<h1>Welcome, {user.username}!</h1>
			<p>Bio: {user.bio || "No bio yet."}</p>
		</div>
	);
}

export default Dashboard;
