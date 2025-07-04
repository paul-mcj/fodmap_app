import { useNavigate } from "react-router-dom";
import {
	logout,
	getUserPosts,
	getUser,
	getUserJournalEntries,
	getUserBlogs
} from "../utils/api_req";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { formatPostDate } from "../utils/format";
import JournalEntryForm from "../components/JournalEntryForm";
import BlogForm from "@/components/BlogForm";

function Dashboard() {
	// const { state } = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [posts, setPosts] = useState([]);
	const [journalEntries, setJournalEntries] = useState([]);
	const [userBlogs, setUserBlogs] = useState([]);

	const fetchJournalEntries = async () => {
		try {
			const res = await getUserJournalEntries();
			setJournalEntries(() => res.data);
			console.log(journalEntries);
		} catch (err) {
			console.error("Fetching user journal entries failed:", err);
		}
	};

	const fetchUserBlogs = async () => {
		try {
			const res = await getUserBlogs();
			setUserBlogs(() => res.data);
			console.log(userBlogs);
		} catch (err) {
			console.error("Fetching user blogs failed:", err);
		}
	};

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
		fetchJournalEntries();
		fetchUserBlogs();
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
			{journalEntries.length === 0 ? (
				<p>No current entries! Make one!</p>
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

			<JournalEntryForm onNewJournalEntry={fetchJournalEntries} />
			<BlogForm onCreateNewBlog={fetchUserBlogs} />
		</div>
	);
}

export default Dashboard;
