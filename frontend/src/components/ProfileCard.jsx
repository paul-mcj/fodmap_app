import { useAuth } from "@/context/AuthContext";
import { Focus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProfileCard = () => {
	const { user, isAuthenticated } = useAuth();

	return (
		<>
			<div className="flex relative items-start text-left mb-0 pt-0 md:pt-12">
				<img
					className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl -z-10"
					// src="https://images.unsplash.com/photo-1546805220-8638b5ff0d42?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					// src="https://images.unsplash.com/photo-1754753676170-f91ffcddb57e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					src="https://images.unsplash.com/photo-1756129725708-87f667b30418?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="Blog Image"
				/>
				{isAuthenticated && (
					<div className="absolute top-0 right-0 p-2 sm:p-4">
						{/* //TODO: clicking this button allows users to choose a new banner (they should only be able to choose form like 20 default ones, no customizing allowed -- have a modal appear when they select) */}
						<Button
							variant="ghost"
							className="cursor-pointer">
							<Focus className="size-4 shrink-0" />
							<p className="hidden sm:block">
								Change Banner
							</p>
						</Button>
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
									Update Photo
								</a>
								<a
									className="block text-[13px] text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
									href="#">
									Update Bio
								</a>
							</>
						)}
						<h1 className="text-2xl font-medium text-neutral-900">
							@{user.username}
						</h1>
					</div>
				</div>
			</div>
			<div className="rounded-b-xl pt-32 px-4 pb-4 lg:pb-8 mb-0 md:px-8 lg:px-12 bg-neutral-100 text-left">
				{isAuthenticated &&
					(user.bio || (
						<p className="text-md text-gray-700 dark:text-neutral-400">
							You do not have a bio filled out. Tell us
							about yourself!&nbsp;
							<a
								className="inline text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400"
								href="#">
								Update Bio
							</a>
						</p>
					))}
				{!isAuthenticated &&
					(user.bio ||
						`@${user.username} does not have a bio yet`)}
				hello my name is he real alsim shady this is a sentence
				about nothing its really just ryring to make sure that the
				papraprhj donest overlfow and looks naturla when its really
				long for some users, it needs to not overflow becaus rhen wt
				wil look bad hello my name is he real alsim shady this is a
				sentence about nothing its really just ryring to make sure
				that the papraprhj donest overlfow and looks naturla when
				its really long for some users, it needs to not overflow
				becaus rhen wt wil look bad hello my name is he real alsim
				shady this is a sentence about nothing its really just
				ryring to make sure that the papraprhj donest overlfow and
				looks naturla when its really long for some users, it needs
				to not overflow becaus rhen wt wil look bad
				{isAuthenticated && (
					<>
						<ul className="mt-8 flex flex-col">
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
					</>
				)}
			</div>
		</>
	);
};

export default ProfileCard;
