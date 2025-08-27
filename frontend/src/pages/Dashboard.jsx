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
import { Focus } from "lucide-react";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import BlogItem from "@/components/blog/BlogItem";

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
		// TODO: check isAuthenticated in initial loading useEffect?

		// isAuthenticated && (
		fetchPosts();
		fetchJournalEntries();
		fetchUserBlogs();
		console.log(user);
	}, []);

	return (
		<>
			<div className="w-full lg:ps-64">
				<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
					<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
						<DashboardPageHeader text={"Dashboard"} />
					</div>
					{/* Profile */}
					<div className="flex flex-col relative p-8 items-start text-left">
						<img
							className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl -z-10 opacity-20"
							src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							alt="Blog Image"
						/>
						<div className="flex items-end gap-x-3 ">
							<div className="absolute top-0 right-0 p-2">
								<Focus className="size-4 shrink-0" />
								<p>Change Banner</p>
								{/* //TODO: clicking this button allows users to choose a new banner (they should only be able to choose form like 20 default ones, no customizing allowed -- have a modal appear when they select) */}
							</div>
							<div className="shrink-0 ">
								<img
									className="shrink-0 size-16 rounded-full"
									src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt="Avatar"
								/>
							</div>
							<div className="text-left">
								<h1 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
									@{user.username}
								</h1>
								<a
									className="block text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
									href="#">
									Update Photo
								</a>
								<a
									className="block text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
									href="#">
									Update Bio
								</a>
							</div>
						</div>
						<div className="mt-8">
							<p className="text-md text-gray-600 dark:text-neutral-400">
								{user.bio ||
									`Tell us about yourself! ${(
										<a
											className="block text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
											href="#">
											Update Bio
										</a>
									)}`}
								hello my name is he real alsim shady
								this is a sentence about nothing its
								really just ryring to make sure that the
								papraprhj donest overlfow and looks
								naturla when its really long for some
								users, it needs to not overflow becaus
								rhen wt wil look bad hello my name is he
								real alsim shady this is a sentence
								about nothing its really just ryring to
								make sure that the papraprhj donest
								overlfow and looks naturla when its
								really long for some users, it needs to
								not overflow becaus rhen wt wil look bad
								hello my name is he real alsim shady
								this is a sentence about nothing its
								really just ryring to make sure that the
								papraprhj donest overlfow and looks
								naturla when its really long for some
								users, it needs to not overflow becaus
								rhen wt wil look bad
							</p>
							<ul className="mt-5 flex flex-col">
								<li className="text-[13px] text-gray-500">
									Discussions created: number here
								</li>
								<li className="text-[13px] text-gray-500">
									Recipes created: number here
								</li>
								<li className="text-[13px] text-gray-500">
									Favourite Recipes: number here
								</li>
							</ul>
						</div>
					</div>

					<h2>Your Journal</h2>
					{journalEntries.length === 0 ? (
						<p>No current entries! Make one!</p>
					) : (
						<ul>
							{journalEntries.map((entry) => (
								<li key={entry.id}>
									<div>{entry.body}</div>
									<div>
										{formatPostDate(
											entry.created_at
										)}
									</div>
								</li>
							))}
						</ul>
					)}
					<JournalEntryForm
						onNewJournalEntry={fetchJournalEntries}
					/>
					<BlogForm onCreateNewBlog={fetchUserBlogs} />
					{/* End Title */}
					{/* Grid */}
					<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Card */}
						<a
							className="group flex flex-col focus:outline-hidden"
							href="#">
							<div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
								<img
									className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
									src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
									alt="Blog Image"
								/>
								<span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900">
									Most Recent Post
								</span>
							</div>

							<div className="mt-7">
								<h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
									title of blog here (as well as tag
									saying if its a discussion or
									recipe)
								</h3>
								<p className="mt-3 text-gray-800 dark:text-neutral-200">
									post made (up to 140 chartcers and
									then ...)
								</p>
								<p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500">
									Read more
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
								</p>
							</div>
						</a>
						{/* TODO: get blogs from database for user */}
						{/* <BlogItem /> */}
						{/* End Card */}

						{/* Card */}
						<a
							className="group flex flex-col focus:outline-hidden"
							href="#">
							<div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden">
								<img
									className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl"
									src="https://images.unsplash.com/photo-1542125387-c71274d94f0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
									alt="Blog Image"
								/>
							</div>

							<div className="mt-7">
								<h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
									View Favourite Recipes
								</h3>
								<p className="mt-3 text-gray-800 dark:text-neutral-200">
									View all your favourite recipes
									form other members of the FODMAP
									Community
								</p>
								<p className="mt-5 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500">
									View all
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
								</p>
							</div>
						</a>
						{/* End Card */}

						{/* Card */}
						<a
							className="group relative flex flex-col w-full min-h-60 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80')] bg-center bg-cover rounded-xl hover:shadow-lg focus:outline-hidden focus:shadow-lg transition"
							href="#">
							<div className="flex-auto p-4 md:p-6">
								<h3 className="text-xl text-white/90 group-hover:text-white">
									<span className="font-bold">
										Your Journal
									</span>{" "}
									is private and its contents are
									never shared. Write down any
									experiences you have while on
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
						{/* End Card */}
					</div>
					{/* End Grid */}
					{/* Title */}
				</div>
				{/* TODO: carousel of maybe 5 or 6 items (most recent first) then a "see all" link after */}
				{/* <BlogItem />s and carousel? */}

				<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
					<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
						<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
							Your Recipes
						</h2>
						<p className="mt-1 text-gray-600 dark:text-neutral-400">
							View all recipes made by you.
						</p>
						<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
							Recent Posts
						</h2>
						<p className="mt-1 text-gray-600 dark:text-neutral-400">
							show users posts in chronological order of
							last edited
							{posts.map((post) => (
								<li key={post.id}>
									<div>{post.body}</div>
									<div>
										{formatPostDate(
											post.created_at
										)}
									</div>
								</li>
							))}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
