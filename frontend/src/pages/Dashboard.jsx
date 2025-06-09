import { useNavigate } from "react-router-dom";
import { logout, getUserPosts } from "../utils/api_req";
import { useEffect, useState } from "react";
import { getUser } from "../utils/api_req";
import Navbar from "../components/Navbar";

function Dashboard() {
	// const { state } = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// verify user is authenticated to view dashboard, otherwise the browser might load a cached version of the page even if user logged out and cookies were cleared
		const verifyUser = async () => {
			try {
				const res = await getUser();
				setUser(() => res.data);
			} catch (err) {
				console.error(
					"Verification failed:",
					err?.response?.data?.detail || err.message
				);
				navigate("/login"); // force to login page if auth fails
			}
		};

		const fetchPosts = async () => {
			try {
				const res = await getUserPosts();
				setPosts(() => res.data);
				console.log(posts);
			} catch (err) {
				console.error("Fetching user posts failed:", err);
			}
		};

		verifyUser();
		fetchPosts();
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
			<h2>Recent Posts</h2>
			{/* show users posts in chronological order of last edited  */}
			{posts.map((post) => (
				<li key={post.id}>
					<div>{post.body}</div>
					<div>{post.created_at}</div>
					<div>{post.author}</div>
				</li>
			))}
		</div>
	);
}

export default Dashboard;
