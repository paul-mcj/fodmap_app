const DashboardPageHeader = ({ text }) => {
	return (
		<h1 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
			{text}
		</h1>
	);
};

export default DashboardPageHeader;
