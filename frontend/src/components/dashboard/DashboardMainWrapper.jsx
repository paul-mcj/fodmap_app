import { Link } from "react-router-dom";
import DashboardUserPopover from "@/components/dashboard/DashboardUserPopover";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MainFooter from "@/components/MainFooter";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const DashboardMainWrapper = ({ children }) => {
	const { user } = useAuth();

	const [userPopoverOpen, setUserPopoverOpen] = useState(false);

	const handleUserPopover = () => {
		setUserPopoverOpen((prev) => !prev);
	};

	return (
		<div className="relative">
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
			<div className="w-full lg:ps-64">
				<div className="px-2 md:px-8 lg:px-8 xl:px-32">
					{/* ||| this is where all the "internal" pages (i.e. children prop components) will need to be shown so that when a user is logged in, the dashboard always wraps those page components! */}
					{children}
				</div>
				<MainFooter>
					<li>
						<Link to="/dashboard/">Go to Dashboard</Link>
					</li>
				</MainFooter>
			</div>
		</div>
	);
};

export default DashboardMainWrapper;
