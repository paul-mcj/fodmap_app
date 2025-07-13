import {
	privateGetUserPosts,
	privateGetUserJournalEntries,
	privateGetUserBlogs
} from "../utils/api_req";
import { useEffect, useState } from "react";
import { formatPostDate } from "../utils/format";
import JournalEntryForm from "../components/JournalEntryForm";
import BlogForm from "@/components/blog/BlogForm";
import LogoutButton from "@/components/ui/LogoutButton";
import { useAuth } from "@/context/AuthContext";

function Dashboard() {
	const { user } = useAuth();

	const [posts, setPosts] = useState([]);
	const [journalEntries, setJournalEntries] = useState([]);
	const [userBlogs, setUserBlogs] = useState([]);

	const fetchJournalEntries = async () => {
		try {
			const res = await privateGetUserJournalEntries();
			setJournalEntries(() => res.data);
			console.log(journalEntries);
		} catch (err) {
			console.error("Fetching user journal entries failed:", err);
		}
	};

	const fetchUserBlogs = async () => {
		try {
			const res = await privateGetUserBlogs();
			setUserBlogs(() => res.data);
			console.log(userBlogs);
		} catch (err) {
			console.error("Fetching user blogs failed:", err);
		}
	};

	const fetchPosts = async () => {
		try {
			const res = await privateGetUserPosts();
			setPosts(() => res.data);
			console.log(posts);
		} catch (err) {
			console.error("Fetching user posts failed:", err);
		}
	};

	useEffect(() => {
		fetchPosts();
		fetchJournalEntries();
		fetchUserBlogs();
	}, []);

	return (
		<div>
			<h1>Welcome, {user.username}!</h1>
			<p>Bio: {user.bio || "No bio yet."}</p>
			<LogoutButton />

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
