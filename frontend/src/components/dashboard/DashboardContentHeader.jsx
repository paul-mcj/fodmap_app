const DashboardContentHeader = ({ header, subheader }) => {
	return (
		<>
			<h2 className="text-2xl font-bold md:leading-tight dark:text-white mt-24">
				{header}
			</h2>
			<p className="mb-4 text-gray-600 dark:text-neutral-400">
				{subheader}
			</p>
		</>
	);
};

export default DashboardContentHeader;
