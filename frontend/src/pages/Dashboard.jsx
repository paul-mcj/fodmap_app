import {
	privateGetUserPosts,
	privateGetUserJournalEntries,
	privateGetUserBlogs
} from "../utils/api_req";
import { useEffect, useState } from "react";
import { formatPostDate } from "../utils/format";
import JournalEntryForm from "../components/JournalEntryForm";
import BlogForm from "@/components/blog/BlogForm";
import { useAuth } from "@/context/AuthContext";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import BlogItem from "@/components/blog/BlogItem";
import ProfileCard from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import DashboardContentHeader from "@/components/dashboard/DashboardContentHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

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
		// TODO: check isAuthenticated in initial loading useEffect?

		// isAuthenticated && (
		fetchPosts();
		fetchJournalEntries();
		fetchUserBlogs();
		console.log(user);
	}, []);

	return (
		<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
			<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
				<DashboardPageHeader text={"Dashboard"} />
			</div>
			<ProfileCard />
			<div className="max-w-[85rem] py-10 lg:py-14 mx-auto">
				<div className="mx-auto text-center mb-10 lg:mb-14">
					<DashboardContentHeader
						header="Your Recent Activity"
						subheader={`Welcome back @${user.username} — here’s what
							you were working on.`}
					/>
					<div className="grid sm:grid-cols-3 gap-6">
						{/* TODO: fetch the last post logged in user made as per timestamp (fetch on back or front end for efficiency?) */}
						{/* TODO: this card always needs a special default image */}
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
						<DashboardCard
							badgeText="Favourite Recipe"
							title="Cabbage rolls"
							text="lorme sg43urg"
							linkText="View Recipe"
							imgRef="https://images.unsplash.com/photo-1755289446025-d04dfe8f0fe3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8"
						/>
						{/* TODO: fetch last journal entry as per timestamp */}
						{/* TODO: this card always needs a special default image */}
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
				<div className="mx-auto text-center mb-10 lg:mb-14">
					<DashboardContentHeader
						header="Discussions"
						subheader="Engage with other FODMAP Community members."
					/>
					<div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
						{/* TODO: 5 to 6 most recent discussions, then a "see all" */}
						<DashboardCard
							title="discussion 1"
							text="lorme sajisj dsioad89 dsa8 lorme sajisj sajisj dsioad89 dsa8 lorme sajis sajisj dsioad89 dsa8 lorme sajis sajisj dsioad89 dsa8 lorme sajisdsioad89 dsa8 lorme sajisj dsioad89 dsa8"
							linkText="Read more"
						/>
						<DashboardCard
							title="discussion 2"
							text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
							linkText="Read more"
						/>
						<DashboardCard
							title="discussion 3"
							text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
							linkText="Read more"
						/>
						<DashboardCard
							title="discussion 4"
							text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
							linkText="Read more"
						/>
						<DashboardCard
							title="discussion 5"
							text="lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8 lorme sajisj dsioad89 dsa8"
							linkText="Read more"
						/>
						<Button className="cursor-pointer self-end">
							All discussions
						</Button>
					</div>
				</div>
				<div className="mx-auto text-center mb-10 lg:mb-14">
					<DashboardContentHeader
						header="Recipes"
						subheader="Get inspired ideas on what to eat for dinner tonight, or
				post one of your famous meals for others."
					/>
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* TODO: 5 to 6 most recent recipes, then a "see all" */}
						<DashboardCard
							title="Meat pie"
							text="lorme sajisj dsioad89 dsa8d9wd dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43 dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf4343g0ruew9fgjr gvu 9rehwg9urg"
							linkText="View recipe"
							imgRef="https://images.unsplash.com/photo-1608039783021-6116a558f0c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVhdCUyMHBpZXxlbnwwfHwwfHx8MA%3D%3D"
						/>
						<DashboardCard
							title="Cabbage rolls"
							text="lorme sg43urg"
							linkText="View Recipe"
							imgRef="https://images.unsplash.com/photo-1622220736031-714bcc9f96b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FiYmFnZSUyMHJvbGxzfGVufDB8fDB8fHww"
						/>
						<DashboardCard
							title="Feta salad with roasted pecans"
							text="ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiw"
							linkText="View recipe"
							imgRef="https://plus.unsplash.com/premium_photo-1673590981774-d9f534e0c617?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FsYWR8ZW58MHx8MHx8fDA%3D"
						/>
						<Button className="cursor-pointer self-end md:col-start-2 md:row-start-2">
							All recipes
						</Button>
					</div>
				</div>

				<div className="mx-auto text-center mb-10 lg:mb-14">
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
							title="post 3"
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
						<Button className="cursor-pointer self-end">
							All your posts
						</Button>
					</div>
				</div>

				<div className="mx-auto text-center mb-10 lg:mb-14">
					<DashboardContentHeader
						header="Journal and Food Tracker"
						subheader="Both are private and their contents are never
								shared with anyone."
					/>
					<div className="grid grid-cols-2 gap-6">
						{/* TODO: this is a custom card on the dashboard, but it follows similar card design */}

						<a
							className="group relative flex flex-col w-full min-h-60 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80')] bg-center bg-cover rounded-xl hover:shadow-lg focus:outline-hidden focus:shadow-lg transition"
							href="#">
							<div className="flex-auto p-4 md:p-6">
								<h3 className="text-md text-white/80 group-hover:text-white">
									<span className="font-bold">
										Your Journal
									</span>
									&nbsp; is where you can write down
									any experiences you have while on
									FODMAP and keep track of your
									progress with certain foods.
								</h3>
							</div>
							<div className="pt-0 p-4 md:p-6">
								<div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70 group-focus:text-white/70">
									Go to Journal
									<svg
										className="shrink-0 size-4"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="m9 18 6-6-6-6" />
									</svg>
								</div>
							</div>
						</a>
						{/* TODO: show a little list of 10 or so items and their level, but a button to go to the "food tracker" page with "more details" */}
						{/* TODO: this is a custom card on the dashboard, but it follows similar card design */}
						<DashboardCard
							badgeText="Food Tracker"
							// title="Keep track of what foods agree with you and which don't."
							title="Keep track of your trigger foods."
							text="carrots 10, cherrires 4"
							linkText="Go to Food Tracker"
							imgRef="https://images.unsplash.com/photo-1756296576686-decd6d93f699?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1OHx8fGVufDB8fHx8fA%3D%3D"
						/>
					</div>
				</div>
			</div>
			<Button className="cursor-pointer self-end mb-16">
				Back to top
			</Button>
		</div>
	);
}

export default Dashboard;
