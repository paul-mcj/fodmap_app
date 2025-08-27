import { Link } from "react-router-dom";
import {
	House,
	CookingPot,
	Hamburger,
	Utensils,
	Notebook,
	NotebookPen,
	SquarePlus,
	Heart,
	MessageSquare,
	MessagesSquare,
	MessageCircle,
	MessageSquarePlus,
	Search
} from "lucide-react";
import DashboardSidebarListItem from "./DashboardSidebarListItem";

const DashboardSidebar = () => {
	return (
		<div
			id="hs-application-sidebar"
			className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform w-65 h-full hidden fixed inset-y-0 start-0 z-60 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:bg-neutral-800 dark:border-neutral-700"
			role="dialog"
			tabindex="-1"
			aria-label="Sidebar">
			<div className="relative flex flex-col h-full max-h-full">
				<div className="px-6 pt-4 flex items-center">
					<Link
						className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80"
						to="/"
						aria-label="FODMAP Community">
						Logo and name here
					</Link>
					<div className="hidden lg:block ms-2"></div>
				</div>
				<div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
					<nav
						className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
						data-hs-accordion-always-open>
						<div className="hidden md:block">
							{/* Search Input */}
							<div className="relative">
								<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
									<Search className="size-4 shrink-0" />
								</div>
								<input
									type="text"
									className="py-2 ps-10 pe-16 block w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
									placeholder="Search"
								/>
								{/* <button
										type="button"
										className="md:hidden size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
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
											<circle
												cx="11"
												cy="11"
												r="8"
											/>
											<path d="m21 21-4.3-4.3" />
										</svg>
										<span className="sr-only">
											Search
										</span>
									</button> */}
								<div className="hidden absolute inset-y-0 end-0 flex items-center z-20 pe-1">
									<button
										type="button"
										className="inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
										aria-label="Close">
										<span className="sr-only">
											Close
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
											<circle
												cx="12"
												cy="12"
												r="10"
											/>
											<path d="m15 9-6 6" />
											<path d="m9 9 6 6" />
										</svg>
									</button>
								</div>
							</div>
							{/* End Search Input */}
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Home
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={House}
									text="Dashboard"
									to="/dashboard/"
								/>
							</ul>
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Discussions
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={MessagesSquare}
									text="All Discussions"
									to="/discussions/"
								/>
								<DashboardSidebarListItem
									Icon={MessageSquare}
									text="Your Discussions"
									// TODO: need frontend page to display this
									// to="/blogs/my/"
								/>
								<DashboardSidebarListItem
									Icon={MessageSquarePlus}
									text="New Discussion"
									// TODO: need frontend page to display this
									// to="/discussions/new/"
								/>
							</ul>
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Recipes
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={CookingPot}
									text="All Recipes"
									to="/recipes/"
								/>
								<DashboardSidebarListItem
									Icon={Utensils}
									text="Your Recipes"
									// TODO: need frontend page to display this
									// to="/recipes/my/"
								/>
								<DashboardSidebarListItem
									Icon={Heart}
									text="Favourite Recipes"
									// TODO: need frontend page to display this
									// to="/favourite-recipes/"
								/>
								<DashboardSidebarListItem
									Icon={SquarePlus}
									text="New Recipe"
									// TODO: need frontend page to display this
									// to="/recipe/new/"
								/>
							</ul>
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Posts
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={MessageCircle}
									text="Your Posts"
									// TODO: need frontend page to display this
									// to="/posts/"
								/>
							</ul>
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Journal
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={Notebook}
									text="Your Journal"
									// TODO: need frontend page to display this
									// to="/journal/"
								/>
								<DashboardSidebarListItem
									Icon={NotebookPen}
									text="New Journal Entry"
									// TODO: need frontend page to display this
									// to="/journal/new/"
								/>
							</ul>
						</div>
						<div class="pt-3 mt-3 flex flex-col border-t border-gray-200 first:border-t-0 first:pt-0 first:mt-0 dark:border-neutral-700">
							<span class="block ps-2.5 mb-2 font-medium text-xs text-left uppercase text-gray-500 dark:text-neutral-500">
								Food Tracker
							</span>
							<ul class="flex flex-col gap-y-1">
								<DashboardSidebarListItem
									Icon={Hamburger}
									text="Food Tracker"
									// TODO: need frontend page to display this
									// to="/tracker/"
								/>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default DashboardSidebar;
