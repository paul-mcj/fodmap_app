"use client";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
	Button
} from "@headlessui/react";
import { SquareX } from "lucide-react";
import BannerSelectionMenu from "./BannerSelectionMenu";
import BannerChoices from "./BannerChoices";
import { useState } from "react";

const BannerModal = ({
	handleBannerModal,
	isBannerModalOpen,
	bannerSelection,
	setBannerSelection,
	originalBannerSelection
}) => {
	const [bannerCategory, setBannerCategory] = useState("Solid Colours");

	const handleOnClose = () => {
		setBannerSelection(() => originalBannerSelection.current);
		handleBannerModal();
	};

	const handleOnSelect = () => {
		// TODO: add this change to database for user and ensure re-render of parent to put a "new" originalBannerSelection into state
		setBannerSelection(() => bannerSelection);
		handleBannerModal();
	};

	return (
		<div>
			<Dialog
				open={isBannerModalOpen}
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
											Change Banner
										</DialogTitle>
										<div className="mt-2">
											<p className="text-sm text-gray-500 dark:text-gray-400">
												Modify the
												appearance of your
												profile banner.
											</p>
										</div>
									</div>
								</div>
								<div className="flex justify-between">
									{/* TODO: each dropdown will have a selection of predefined grid items to choose from */}
									{/* TODO: the current selected one is bordered in blue*/}
									{/* TODO: only "seclted" button being clicked actually saves the choice, if an option is highlighted, even if different than the previous one, if they cancel the modal it will not be used... */}
									<BannerSelectionMenu
										category={bannerCategory}
										setBannerCategory={
											setBannerCategory
										}
									/>
								</div>
								<BannerChoices
									category={bannerCategory}
									selection={bannerSelection}
									setBannerSelection={
										setBannerSelection
									}
								/>
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
