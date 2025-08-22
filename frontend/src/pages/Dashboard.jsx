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
import BlogItem from "@/components/blog/BlogItem";
import { Link } from "react-router-dom";
import DashboardUserPopover from "@/components/dashboard/DashboardUserPopover";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Focus } from "lucide-react";

function Dashboard() {
	const { user, isAuthenticated } = useAuth();

	const [posts, setPosts] = useState([]);
	const [journalEntries, setJournalEntries] = useState([]);
	const [userBlogs, setUserBlogs] = useState([]);
	const [userPopoverOpen, setUserPopoverOpen] = useState(false);

	const handleUserPopover = () => {
		setUserPopoverOpen((prev) => !prev);
	};

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
			{/* ||| TODO: FROM HERE!!!!!!!!!!!!! */}
			{/* ========== HEADER ========== */}
			<header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-48 w-full bg-white border-b border-gray-200 text-sm py-2.5 lg:ps-65 dark:bg-neutral-800 dark:border-neutral-700">
				<nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
					<div className="me-5 lg:me-0 lg:hidden">
						<Link
							className="flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
							to="/"
							aria-label="FODMAP Community">
							Logo on small screens here
						</Link>
						<div className="lg:hidden ms-1"></div>
					</div>
					<div className="flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3">
						<div className="flex flex-row items-center justify-end gap-1">
							{/* TODO: Add notifications when a new comment has been made on any blogs that specific user has made?? */}
							<button
								type="button"
								className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
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
									<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
									<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
								</svg>
								<span className="sr-only">
									Notifications
								</span>
							</button>

							{/* TODO: Add activity when a new comment has been made on any blogs user is a prt of, or when a new blog has been added to the main page?? */}

							<button
								type="button"
								className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
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
									<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
								</svg>
								<span className="sr-only">
									Activity
								</span>
							</button>

							{/* Dropdown */}
							<div className="hs-dropdown [--placement:bottom-right] relative inline-flex open">
								<button
									onClick={handleUserPopover}
									id="hs-dropdown-account"
									type="button"
									className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white"
									aria-haspopup="menu"
									aria-expanded="false"
									aria-label="Dropdown">
									<img
										className="shrink-0 size-9.5 rounded-full"
										src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
										alt="Avatar"
									/>
								</button>
								<DashboardUserPopover
									userPopoverOpen={userPopoverOpen}
									user={user}
								/>
							</div>
							{/* End Dropdown */}
						</div>
					</div>
				</nav>
			</header>
			{/* ========== END HEADER ========== */}

			{/* ========== MAIN CONTENT ========== */}
			<div className="-mt-px">
				<div className="sticky top-0 inset-x-0 z-20 bg-white border-y border-gray-200 px-4 sm:px-6 lg:px-8 lg:hidden dark:bg-neutral-800 dark:border-neutral-700">
					<div className="flex items-center py-2">
						{/* Navigation Toggle */}
						<button
							type="button"
							className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
							aria-haspopup="dialog"
							aria-expanded="false"
							aria-controls="hs-application-sidebar"
							aria-label="Toggle navigation"
							data-hs-overlay="#hs-application-sidebar">
							<span className="sr-only">
								Toggle Navigation
							</span>
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
								<rect
									width="18"
									height="18"
									x="3"
									y="3"
									rx="2"
								/>
								<path d="M15 3v18" />
								<path d="m8 9 3 3-3 3" />
							</svg>
						</button>
						{/* End Navigation Toggle */}

						{/* Breadcrumb */}
						<ol className="ms-3 flex items-center whitespace-nowrap">
							<li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
								Home
								{/* TODO: pass props depending on name of category: <span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Posts
							</span> */}
								<svg
									className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400 dark:text-neutral-500"
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</li>
							<li
								className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-400"
								aria-current="page">
								Dashboard
								{/* TODO: pass props depending on text of selected DashboardSidebarListItem: <DashboardSidebarListItem
									Icon={MessageCircle}
									text="View Your Posts"
								/> */}
							</li>
						</ol>
						{/* End Breadcrumb */}
					</div>
				</div>
			</div>

			<DashboardSidebar />

			{/* Content */}
			<div className="w-full lg:ps-64">
				<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
					<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
						<h1 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
							Dashboard
						</h1>
					</div>
					{/* Profile */}
					<div className="flex flex-col relative p-2 items-start text-lefttext-wrap">
						<img
							className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-xl -z-10 opacity-20"
							src="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							alt="Blog Image"
						/>
						<div className="flex items-end gap-x-3">
							<div className="absolute top-0 right-0 p-2">
								<Focus className="size-4 shrink-0" />
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
								{/* hello my name is he real alsim shady
								this is a sentence about nothing its
								really just ryring to make sure that the
								papraprhj donest overlfow and looks
								naturla when its really long for some
								users, it needs to not overflow becaus
								rhen wt wil look bad */}
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
					<h2>Recent Posts</h2>
					show users posts in chronological order of last edited
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
				<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
					<div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
						{/* <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
						Dashboard
					</h2> */}
						<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
							Your Recipes
						</h2>
						<p className="mt-1 text-gray-600 dark:text-neutral-400">
							View all recipes made by you.
						</p>
					</div>
					{/* blogItem and carousel? */}
				</div>
			</div>
			{/* </div> */}
			{/* End Content */}
			{/* ========== END MAIN CONTENT ========== */}
			{/* ||| TODO: TO HERE!!!!!!!!!!!!!!!!! */}
		</>
	);
}

export default Dashboard;

// {isAuthenticated && (
// 						<NavigationMenuItem>
// 							<NavigationMenuTrigger>
// 								Profile
// 							</NavigationMenuTrigger>
// 							<NavigationMenuContent>
// 								<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
// 									<li className="row-span-4">
// 										<NavigationMenuLink asChild>
// 											<Link
// 												to="/dashboard"
// 												className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md">
// 												<div className="mt-4 mb-2 text-lg font-medium">
// 													Dashboard
// 												</div>
// 												<p className="text-muted-foreground text-sm leading-tight">
// 													An overview of
// 													your personal
// 													FODMAP data
// 													right here
// 												</p>
// 											</Link>
// 										</NavigationMenuLink>
// 									</li>
// 									{/* // TODO: quick links to posts, journal, foods, etc. */}
// 									<ListItem
// 										to="/posts"
// 										title="Your Posts">
// 										View your entire post history
// 									</ListItem>
// 									<ListItem
// 										to="/journal"
// 										title="Your Journal Entries">
// 										Make personal journal entries
// 										and keep track of your FODMAP
// 										progress
// 									</ListItem>
// 									<ListItem
// 										to="/foods"
// 										title="Your Foods">
// 										Keep track of individual food
// 										items and ingredients and rate
// 										how they impact you
// 									</ListItem>
// 									<NavigationMenuLink asChild>
// 										<LogoutButton />
// 									</NavigationMenuLink>
// 								</ul>
// 							</NavigationMenuContent>
// 						</NavigationMenuItem>
// 					)}

// function ListItem({ title, children, to, ...props }) {
// 	return (
// 		<li {...props}>
// 			<NavigationMenuLink asChild>
// 				<Link to={to}>
// 					<div className="text-sm leading-none font-medium">
// 						{title}
// 					</div>
// 					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
// 						{children}
// 					</p>
// 				</Link>
// 			</NavigationMenuLink>
// 		</li>
// 	);
// }
