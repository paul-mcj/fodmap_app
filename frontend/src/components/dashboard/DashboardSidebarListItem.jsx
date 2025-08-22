// eslint-disable-next-line no-unused-vars
const DashboardSidebarListItem = ({ Icon, text }) => {
	return (
		<li>
			<a
				className="flex items-center gap-x-3.5 py-2 px-2.5 active:bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
				href="#">
				<Icon className="size-4 shrink-0" />
				{text}
			</a>
		</li>
	);
};

export default DashboardSidebarListItem;
