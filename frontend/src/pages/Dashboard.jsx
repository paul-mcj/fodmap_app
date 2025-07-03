import { useNavigate } from "react-router-dom";
import {
	logout,
	getUserPosts,
	getUser,
	getUserJournalEntries
} from "../utils/api_req";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { formatPostDate } from "../utils/format";
import JournalEntryForm from "../components/JournalEntryForm";

function Dashboard() {
	// const { state } = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [journalEntries, setJournalEntries] = useState([]);

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

		const fetchJournalEntries = async () => {
			try {
				const res = await getUserJournalEntries();
				setJournalEntries(() => res.data);
				console.log(journalEntries);
			} catch (err) {
				console.error("Fetching user journal entries failed:", err);
			}
		};

		verifyUser();
		fetchPosts();
		fetchJournalEntries();
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
					<div>{formatPostDate(post.created_at)}</div>
				</li>
			))}
			<h2>Journal Entries</h2>
			{journalEntries ?? journalEntries.length <= 0 ? (
				<p>No current entries! make one!</p>
			) : (
				<ul>
					{journalEntries.map((entry) => (
						<li key={entry.id}>
							<div>{entry.body}</div>
							<div>{formatPostDate(entry.created_at)}</div>
						</li>
					))}
				</ul>
			)}
			<JournalEntryForm />
		</div>
	);
}

export default Dashboard;
