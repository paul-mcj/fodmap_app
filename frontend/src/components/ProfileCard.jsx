import { useAuth } from "@/context/AuthContext";
import { Focus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import BannerModal from "./banner/BannerModal";
import BioModal from "./bio/BioModal";
import { formatPostDate } from "@/utils/format";
import { useLocation } from "react-router-dom";

const ProfileCard = () => {
	const { user, isAuthenticated } = useAuth();
	const location = useLocation();

	const [bannerSelection, setBannerSelection] = useState("bg-red-400");
	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
	const [isBioModalOpen, setIsBioModalOpen] = useState(false);

	const originalBannerSelection = useRef(bannerSelection);
	const bioRef = useRef(user?.bio);

	const handleBannerModal = () => {
		setIsBannerModalOpen((prev) => !prev);
	};

	const handleBioModal = () => {
		setIsBioModalOpen((prev) => !prev);
	};

	useEffect(() => {
		if (location.state?.openModal === "banner") {
			// always set to true
			setIsBannerModalOpen(() => true);

			// remove the state so back navigation doesn't reopen it
			window.history.replaceState({}, document.title);

			// scroll to top
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [location.state]);

	return (
		<>
			<div className="flex relative items-start text-left mb-0 pt-0 md:pt-12">
				{/* TODO: eventually will need to check database for something else to differentiate images from colors/gradients */}
				{bannerSelection?.startsWith("http") ? (
					<img
						className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl -z-10"
						// src="https://images.unsplash.com/photo-1546805220-8638b5ff0d42?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						// src="https://images.unsplash.com/photo-1754753676170-f91ffcddb57e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						src={bannerSelection}
						alt="Blog Image"
					/>
				) : (
					bannerSelection && (
						<span
							className={`${bannerSelection} size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl -z-10 border border-gray-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700`}></span>
					)
				)}
				{isAuthenticated && (
					<div className="absolute top-0 right-0 p-2 sm:p-4">
						{/* //TODO: clicking this button allows users to choose a new banner (they should only be able to choose form like 20 default images or a color picker w defaults, no customizing allowed -- have a modal appear when they select) */}
						<Button
							variant="ghost"
							className="cursor-pointer"
							state={{ openModal: "banner" }}
							onClick={handleBannerModal}>
							<Focus className="size-4 shrink-0" />
							<p className="hidden sm:block">
								Change Banner
							</p>
						</Button>
						<BannerModal
							handleBannerModal={handleBannerModal}
							bannerSelection={bannerSelection}
							isBannerModalOpen={isBannerModalOpen}
							setBannerSelection={setBannerSelection}
							originalBannerSelection={
								originalBannerSelection
							}
						/>
					</div>
				)}
				<div className="flex items-end gap-4 ml-4 md:ml-8 lg:ml-12 relative top-20">
					<div className="shrink-0">
						<img
							className="shrink-0 size-32 rounded-full"
							src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							alt="Avatar"
						/>
					</div>
					<div>
						{isAuthenticated && (
							<>
								<a
									className="block text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
									href="#">
									Change Avatar
								</a>
								<button
									className="inline text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 cursor-pointer"
									onClick={handleBioModal}>
									Update Bio
								</button>
							</>
						)}
						<h1 className="text-2xl font-medium text-neutral-900">
							@{user.username}
						</h1>
					</div>
				</div>
			</div>
			{/* <div className="rounded-b-xl pt-32 px-4 pb-4 lg:pb-8 mb-0 md:px-8 lg:px-12 bg-neutral-100 text-left"> */}
			<div className="rounded-b-xl pt-32 px-4 pb-4 lg:pb-8 mb-0 md:px-8 lg:px-12 text-left bg-white border border-t-0 border-gray-200 shadow-xl dark:bg-neutral-900 dark:border-neutral-800">
				{isAuthenticated &&
					(user?.bio || (
						<p className="text-md text-gray-700 dark:text-neutral-400">
							You do not have a bio filled out. Tell us
							about yourself!&nbsp;
							<button
								className="inline text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400 cursor-pointer"
								onClick={handleBioModal}>
								Update Bio
							</button>
						</p>
					))}
				{!isAuthenticated &&
					(user?.bio ||
						`@${user.username} does not have a bio yet`)}
				{isAuthenticated && user.date_joined && (
					<p className="text-[13px] text-gray-500 mt-8">
						Joined on&nbsp;
						{new Date(user.date_joined).toLocaleDateString(
							"en-US",
							{
								year: "numeric",
								month: "long",
								day: "numeric"
							}
						)}
						&nbsp;&#40;
						{formatPostDate(user.date_joined)}
						&#41;
					</p>
				)}
			</div>
			<BioModal
				handleBioModal={handleBioModal}
				isBioModalOpen={isBioModalOpen}
				bioRef={bioRef.current}
			/>
		</>
	);
};

export default ProfileCard;
