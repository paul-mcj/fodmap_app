import { Link } from "react-router-dom";

const DashboardCard = ({ badgeText, title, text, linkText, imgRef }) => {
	return (
		<Link
			className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
			to="/">
			{imgRef && (
				<div className="relative pt-[50%] sm:pt-[70%] rounded-t-xl overflow-hidden">
					<img
						className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
						src={imgRef}
						alt="Blog Image"
					/>
					{badgeText && (
						<span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900">
							{badgeText}
						</span>
					)}
				</div>
			)}
			<div className="p-2 md:p-4">
				<h3 className="text-md md:text-xl font-semibold text-gray-800 group-hover:text-gray-600 dark:text-neutral-300 dark:group-hover:text-white">
					{title.length > 60
						? title.substring(0, 60) + "..."
						: title}
				</h3>
				<p className="my-4 text-gray-800 dark:text-neutral-200 text-xs md:text-sm">
					{text.length > 120
						? text.substring(0, 120) + "..."
						: text}
				</p>
			</div>
			<p className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 group-hover:underline group-focus:underline font-medium dark:text-blue-500 self-center mt-auto mb-4">
				{linkText}
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
					<path d="m9 18 6-6-6-6" />
				</svg>
			</p>
		</Link>
	);
};

export default DashboardCard;
