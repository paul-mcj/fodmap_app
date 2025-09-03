import { Link } from "react-router-dom";
import { formatPostDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";

const BlogItem = (blog) => {
	return (
		<Link
			className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
			to={`/blogs/${blog.blog.id}`}>
			{/* {blog.blog.imgRef && ( */}
			<div className="relative pt-[50%] sm:pt-[70%] rounded-t-xl overflow-hidden">
				<img
					className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
					/* TODO: imageSrc needs to point to backend as well */
					// src={blog.blog.imgRef}
					src="https://plus.unsplash.com/premium_photo-1668472273855-b5ac9441907e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXNwcmVzc298ZW58MHwwfDB8fHww"
					alt="Blog Image"
				/>
				{blog.blog.type && (
					<span className="absolute top-0 end-0 rounded-se-xl rounded-es-xl text-xs font-medium bg-gray-800 text-white py-1.5 px-3 dark:bg-neutral-900">
						{blog.blog.type}
					</span>
				)}
			</div>
			{/* )} */}
			<div className="p-4 md:p-5 text-left">
				<div className="flex flex-row justify-between">
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{formatPostDate(blog.blog.created_at)}
					</p>
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{"@" + blog.blog.author.username}
					</p>
				</div>
				<ul className="flex mt-2 flex-row flex-wrap gap-2 justify-start">
					{/* only show the first 5 food items as badges */}
					{blog.blog.foods.slice(0, 5).map((food) => (
						<li key={food.id}>
							<Badge>{food.name}</Badge>
						</li>
					))}

					{blog.blog.foods.length > 5 && (
						<li>
							<Badge>+{blog.blog.foods.length - 5}</Badge>
						</li>
					)}
				</ul>
				<p className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
					{blog.blog.title}
				</p>
			</div>
		</Link>
	);
};

export default BlogItem;

// import { Link } from "react-router-dom";
// import { formatPostDate } from "@/utils/format";
// import { Badge } from "@/components/ui/badge";

// const BlogItem = (blog) => {
// 	return (
// 		<Link
// 			className="group flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl hover:shadow-md focus:outline-hidden focus:shadow-md transition dark:bg-neutral-900 dark:border-neutral-800"
// 			to={`/blogs/${blog.blog.id}`}>
// 			<div className="aspect-w-16 aspect-h-9">
// 				<img
// 					className="w-full object-cover rounded-t-xl"
// 					// TODO: imageSrc needs to point to backend as well
// 					src={
// 						"https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// 					}
// 					alt={blog.blog.title}
// 				/>
// 			</div>
// 			<div className="p-4 md:p-5 text-left">
// 				<ul className="flex flex-row justify-evenly flex-wrap">
// 					<li>
// 						<Badge>{blog.blog.type}</Badge>
// 					</li>
// 					{blog.blog.foods.map((food) => (
// 						<li key={food.id}>
// 							<Badge variant="secondary">
// 								{food.name}
// 							</Badge>
// 						</li>
// 					))}
// 				</ul>
// 				<div className="flex flex-row justify-between">
// 					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
// 						{formatPostDate(blog.blog.created_at)}
// 					</p>
// 					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
// 						{"@" + blog.blog.author.username}
// 					</p>
// 				</div>
// 				<h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
// 					{blog.blog.title}
// 				</h3>
// 			</div>
// 		</Link>
// 	);
// };

// export default BlogItem;
