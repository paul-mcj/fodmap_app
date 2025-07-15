import { Link } from "react-router-dom";
import { formatPostDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";

const BlogItem = ({
	linkHref,
	imageSrc,
	author,
	title,
	foods,
	created_at,
	type
}) => {
	return (
		<Link
			className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
			href={linkHref}>
			<div className="aspect-w-16 aspect-h-9">
				<img
					className="w-full object-cover rounded-t-xl"
					src={imageSrc}
					alt={title}
				/>
			</div>
			<div className="p-4 md:p-5 text-left">
				<ul className="flex flex-row justify-evenly flex-wrap">
					<li>
						<Badge>{type}</Badge>
					</li>
					{foods.map((food) => (
						<li key={food.id}>
							<Badge variant="secondary">
								{food.name}
							</Badge>
						</li>
					))}
				</ul>
				<div className="flex flex-row justify-between">
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{formatPostDate(created_at)}
					</p>
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{author}
					</p>
				</div>
				<h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
					{title}
				</h3>
			</div>
		</Link>
	);
};

export default BlogItem;
