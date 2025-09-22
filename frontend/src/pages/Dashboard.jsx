import {
	privateGetUserPosts,
	privateGetUserJournalEntries,
	privateGetUserBlogs,
	publicGetAllBlogsOfType
} from "../utils/api_req";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import DashboardContentHeader from "@/components/dashboard/DashboardContentHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

function Dashboard() {
	const { user } = useAuth();

	const [posts, setPosts] = useState([]);
	const [journalEntries, setJournalEntries] = useState([]);
	const [userBlogs, setUserBlogs] = useState([]);
	const [recentDiscussions, setRecentDiscussions] = useState([]);
	const [recentRecipes, setRecentRecipes] = useState([]);

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

	const fetchRecentDiscussionsForDashboard = async () => {
		publicGetAllBlogsOfType("discussions", 6)
			.then((res) => {
				console.log("Discussions returned:", res.data);
				setRecentDiscussions(() => res.data);
			})
			.catch((error) => {
				console.log(`Error with Discussions useEffect: ${error}`);
			});
	};

	const fetchRecentRecipesForDashboard = async () => {
		publicGetAllBlogsOfType("recipes", 6)
			.then((res) => {
				console.log("Recipes returned:", res.data);
				setRecentRecipes(() => res.data);
			})
			.catch((error) => {
				console.log(`Error with Recipes useEffect: ${error}`);
			});
	};

	useEffect(() => {
		// TODO: check isAuthenticated in initial loading useEffect?

		// isAuthenticated && (
		fetchPosts();
		fetchJournalEntries();
		fetchUserBlogs();
		fetchRecentDiscussionsForDashboard();
		fetchRecentRecipesForDashboard();
		console.log(user);
	}, []);

	return (
		<>
			<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
				<div className="max-w-[85rem] mx-auto">
					<div className="max-w-2xl mx-auto text-center mb-12">
						<PageHeader text="Dashboard" />
					</div>
					<ProfileCard />
					<div className="mx-auto text-center">
						<DashboardContentHeader
							header="Your Recent Activity"
							subheader={`Welcome back @${user.username} — here’s what
							you were working on.`}
						/>
						<div className="grid sm:grid-cols-3 gap-6">
							{/* TODO: fetch the last post logged in user made as per timestamp (fetch on back or front end for efficiency?) */}
							{/* TODO: this card always needs a special default image */}
							{/* ||| need posts app */}
							<DashboardCard
								badgeText="Last Post"
								title="d89w32hjr893"
								text="lorme sajisj dsioad89 dsa8d9wd dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43 dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf4343g0ruew9fgjr gvu 9rehwg9urg"
								linkText="Read more"
								imgRef="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							/>
							{/* TODO: fetch last favourited recipe as per timestamp */}
							{/* TODO: this card always needs a special default image */}
							{/* ||| need ability for user to add fav recipes */}
							<DashboardCard
								badgeText="Favourite Recipe"
								title="Cabbage rolls"
								text="lorme sg43urg"
								linkText="View Recipe"
								imgRef="https://images.unsplash.com/photo-1755289446025-d04dfe8f0fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
							/>
							{/* TODO: fetch last journal entry as per timestamp */}
							{/* TODO: this card always needs a special default image */}
							{/* ||| need to fix journal app */}
							<DashboardCard
								badgeText="Journal Entry"
								title="Bacon didn't turn out to good Bacon didn't turn out to good Bacon didn't turn out to good Bacon didn't turn out to good Bacon didn't turn out to good Bacon didn't turn out to good Bacon didn't turn out to goodBacon didn't turn out to good Bacon didn't turn out to good"
								text="ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiw"
								linkText="View Journal"
								imgRef="https://images.unsplash.com/photo-1756296576686-decd6d93f699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D"
							/>
						</div>
					</div>
					<div className="mx-auto text-center">
						<DashboardContentHeader
							header="Recent Discussions"
							subheader="Engage with other FODMAP Community members."
						/>
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
							{/* get 6 most recent discussions */}
							{/* ||| should be bloglists not dashboard cards... */}
							{recentDiscussions.map((discussion) => (
								<DashboardCard
									key={discussion.id}
									title={discussion.title}
									text={discussion.text}
									linkText="Read more"
									// TODO: this needs to be checked and eventually passed in, otherwise default image
									imgRef="https://plus.unsplash.com/premium_vector-1707838698173-5c0a52af62e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJ1aXR8ZW58MHwwfDB8fHww"
									to={`/blogs/${discussion.id}`}
								/>
							))}
						</div>
						<Link to="/discussions">
							<Button className="cursor-pointer mt-8 md:col-start-2 md:row-start-2">
								All discussions
							</Button>
						</Link>
					</div>
					<div className="mx-auto text-center">
						<DashboardContentHeader
							header="Recent Recipes"
							subheader="Get inspired ideas on what to eat for dinner tonight, or
				post one of your famous meals for others."
						/>
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
							{/* get 6 most recent recipes */}
							{/* ||| should be bloglists not dashboard cards... */}
							{recentRecipes.map((recipe) => (
								<DashboardCard
									key={recipe.id}
									title={recipe.title}
									text={recipe.text}
									linkText="Read more"
									// TODO: this needs to be checked and eventually passed in, otherwise default image
									imgRef="https://plus.unsplash.com/premium_vector-1707838698173-5c0a52af62e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZnJ1aXR8ZW58MHwwfDB8fHww"
									to={`/blogs/${recipe.id}`}
								/>
							))}
						</div>

						<Link to="/recipes">
							<Button className="cursor-pointer mt-8 md:col-start-2 md:row-start-2">
								All recipes
							</Button>
						</Link>
					</div>
					<div className="mx-auto text-center">
						<DashboardContentHeader
							header="Your Recent Posts"
							subheader="View what you have posted on other discussions and recipes."
						/>
						<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
							{/* TODO: show users posts in chronological order of last edited, 5 to 6 recent then a "see all" */}
							{/* {posts.map((post) => (
								<li key={post.id}>
									<div>{post.body}</div>
									<div>
										{formatPostDate(
											post.created_at
										)}
									</div>
								</li>
							))} */}
							<DashboardCard
								title="post 1"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj sajisj dsioad89 dsa8 lorme sajis sajisj dsioad89 dsa8 lorme sajis sajisj dsioad89 dsa8 lorme sajisdsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
							<DashboardCard
								title="post 2"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
							<DashboardCard
								title="pme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8me sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
							<DashboardCard
								title="post 4"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
							<DashboardCard
								title="post 5"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
							<DashboardCard
								title="post 6"
								text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
								linkText="Read more"
							/>
						</div>
						<Button className="cursor-pointer mt-8 md:col-start-2 md:row-start-2">
							All your posts
						</Button>
					</div>
					<div className="mx-auto text-center">
						<DashboardContentHeader
							header="Journal and Food Tracker"
							subheader="Both are private and their contents are never
								shared with anyone."
						/>
						{/* <div className="grid grid-cols-2 gap-6"> */}
						<div className="grid sm:grid-cols-2 gap-6">
							<DashboardCard
								title="Your Journal"
								text="Write
										down any experiences you have
										while on FODMAP and keep track
										of your progress."
								linkText="Go to Journal"
								imgRef="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGpvdXJuYWx8ZW58MHwwfDB8fHww"
							/>
							<DashboardCard
								text="Keep track of what foods agree with you and which don't."
								title="Food Tracker"
								linkText="Go to Food Tracker"
								imgRef="https://images.unsplash.com/photo-1748609523112-da78cb7210a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoZWNrbGlzdHxlbnwwfDB8MHx8fDA%3D"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10 md:mt-42">
				<a href="#">
					<Button className="cursor-pointer self-end mb-16">
						Go to top
					</Button>
				</a>
			</div>
		</>
	);
}

export default Dashboard;
