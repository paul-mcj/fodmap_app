import LogoutButton from "@/components/ui/LogoutButton";
import { Image, Pencil, Focus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, Button } from "@headlessui/react";

const DashboardUserPopover = ({ userPopoverOpen, handleUserPopover, user }) => {
	const navigate = useNavigate();

	return (
		<Popover
			open={userPopoverOpen}
			onClose={() => handleUserPopover()}>
			<div
				className={`pointer-events-auto hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100  min-w-60 bg-white shadow-md rounded-lg z-100 mt-8 mr-4 sm:mr-8 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 fixed top-10 right-0 ${
					!userPopoverOpen && "opacity-0 hidden"
				}`}
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="hs-dropdown-account">
				<div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
					<p className="text-sm text-gray-500 dark:text-neutral-500">
						Signed in as
					</p>
					<p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
						{user.email}
					</p>
				</div>
				<div className="p-1.5 space-y-0.5 grid">
					<Button
						className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
						// TODO: route to authenticated modal to change banner
						onClick={() =>
							navigate("/dashboard/", {
								state: { openModal: "avatar" }
							})
						}>
						<Image className="size-4 shrink-0" />
						Change Avatar
					</Button>
					<Button
						className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
						// TODO: route to authenticated modal to change banner
						onClick={() =>
							navigate("/dashboard/", {
								state: { openModal: "bio" }
							})
						}>
						<Pencil className="size-4 shrink-0" />
						Update Bio
					</Button>
					<Button
						className="cursor-pointer flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
						// TODO: route to authenticated modal to change banner
						onClick={() =>
							navigate("/dashboard/", {
								state: { openModal: "banner" }
							})
						}>
						<Focus className="size-4 shrink-0" />
						Change Banner
					</Button>
					<div className="mt-2 place-self-center">
						<LogoutButton />
					</div>
				</div>
			</div>
		</Popover>
	);
};

export default DashboardUserPopover;
