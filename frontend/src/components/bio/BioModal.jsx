"use client";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Button,
	Input
} from "@headlessui/react";
import { SquareX } from "lucide-react";
import { useState } from "react";
import { privatePatchUserBio } from "@/utils/api_req";
import { useAuth } from "@/context/AuthContext";

const BannerModal = ({ handleBioModal, isBioModalOpen, bioRef }) => {
	const { setUser } = useAuth();
	const [newBio, setNewBio] = useState(bioRef);

	const handleOnClose = () => {
		setNewBio(() => bioRef); // reset to original bio on close
		handleBioModal();
	};

	const handleOnSelect = async () => {
		try {
			const res = await privatePatchUserBio(newBio);
			// Update global user context with new bio
			setUser((prev) => ({
				...prev,
				bio: res.data.bio
			}));
		} catch (error) {
			// TODO: add user notification for error
			console.error(
				"BioModal handleOnSelect fn: Failed to update bio:",
				error
			);
		}
		handleBioModal();
	};

	return (
		<div>
			<Dialog
				open={isBioModalOpen}
				onClose={handleOnClose}
				className="relative z-100">
				<DialogBackdrop
					transition
					className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in dark:bg-gray-900/50"
				/>
				<div className="fixed top-20 sm:top-75 lg:top-80 z-90 w-screen overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<DialogPanel
							transition
							className=" transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 dark:bg-gray-800 dark:outline dark:-outline-offset-1 dark:outline-white/10">
							<div className=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800 flex flex-col">
								<div className="sm:flex sm:items-start mb-8">
									{/* https://tailwindcss.com/plus/ui-blocks/application-ui/overlays/modal-dialogs */}
									{/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10 dark:bg-red-500/10">
										<ExclamationTriangleIcon
											aria-hidden="true"
											className="size-6 text-red-600 dark:text-red-400"
										/>
									</div> */}
									<Button
										className="cursor-pointer hover:scale-120 transition-transform duration-500 ease-in-out"
										onClick={handleOnClose}>
										<SquareX className="size-5 shrink-0 sm:size-6" />
									</Button>
									<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
										<DialogTitle
											as="h3"
											className="text-base font-semibold text-gray-900 dark:text-white leading-none">
											Update Bio
										</DialogTitle>
										<div className="mt-2">
											<p className="text-sm text-gray-500 dark:text-gray-400">
												Change the
												description of your
												bio so that everyone
												knows more about
												you!
											</p>
										</div>
									</div>
								</div>
								<div className="flex justify-between">
									<Input
										as="textarea"
										rows={4}
										value={newBio}
										onChange={(e) =>
											setNewBio(e.target.value)
										}
										className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
										placeholder="Enter your new bio here..."
									/>
								</div>
							</div>
							<div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700/25">
								<Button
									onClick={handleOnClose}
									className="cursor-pointer inline-flex w-full justify-center rounded-md bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-neutral-500 sm:ml-3 sm:w-auto dark:bg-neutral-500 dark:shadow-none dark:hover:bg-neutral-400">
									Cancel
								</Button>
								<Button
									onClick={handleOnSelect}
									className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20">
									Select
								</Button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</div>
	);
};

export default BannerModal;
