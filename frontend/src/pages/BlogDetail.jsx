import { useEffect, useState } from "react";
import { publicGetSingleBlog } from "@/utils/api_req";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatPostDate } from "@/utils/format";
import { Link } from "react-router-dom";

const BlogDetail = () => {
	const params = useParams();
	const [blog, setBlog] = useState({});

	// initial data fetch
	useEffect(() => {
		publicGetSingleBlog(params.id)
			.then((res) => {
				console.log("Single blog data returned:", res.data);
				setBlog(() => res.data);
			})
			.catch((error) => {
				console.log(`Error with BlogDetail useEffect: ${error}`);
			});
	}, []);

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full">
				<div className="flex relative items-start text-left mb-0 pt-0">
					{/* TODO: check if it has an image -- if yes add that source otherwise point to a default one on backend*/}
					{/* {blog?.imgSrc && */}
					<img
						className="size-full absolute top-0 start-0 object-cover group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl -z-10"
						src={
							"https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						alt={blog.title}
					/>
					{/* } */}
					<div className="flex items-end gap-4 ml-4 md:ml-8 lg:ml-12 relative top-20">
						<div className="shrink-0">
							<img
								className="shrink-0 size-32 rounded-full"
								// TODO: using blog?.author?.id, find them in the database and add their image
								src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="Avatar"
							/>
						</div>
						<div>
							<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
								{blog.type}&nbsp;created&nbsp;
								{formatPostDate(blog.created_at)}
								&nbsp;by&nbsp;
							</p>
							<Link
								className="cursor-pointer text-xl font-medium text-neutral-900"
								// TODO: link to authors profile page
								to="#">
								{"@" + blog?.author?.username}
							</Link>
						</div>
					</div>
				</div>
				<div className="rounded-b-xl pt-32 px-4 pb-4 lg:pb-8 md:px-8 lg:px-12 text-left bg-white border border-t-0 border-gray-200 shadow-xl dark:bg-neutral-900 dark:border-neutral-800">
					<ul className="flex flex-row flex-wrap gap-2 justify-start">
						{blog?.foods?.map((food) => (
							<li key={food.id}>
								<Badge>{food.name}</Badge>
							</li>
						))}
					</ul>
					<h1 className="text-xl font-medium text-neutral-900 mt-4">
						{blog.title}
					</h1>
					<p className="mt-4">{blog.description}</p>
				</div>
				{/* TODO: put the post/responses here in their own div: */}
			</div>
		</div>
	);
};

export default BlogDetail;

// return (
// 		<PageTemplate>
// 			<h1>{blog.title}+</h1>
// 			<div className="aspect-w-16 aspect-h-9">
// 				<img
// 					className="w-full object-cover rounded-t-xl"
// 					// TODO: imageSrc needs to point to backend as well
// 					src={
// 						"https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
// 					}
// 					alt={blog.title}
// 				/>
// 			</div>
// 			<div className="p-4 md:p-5 text-left">
// 				<ul className="flex flex-row justify-evenly flex-wrap">
// 					<li>
// 						<Badge>{blog.type}</Badge>
// 					</li>
// 					{blog?.foods?.map((food) => (
// 						<li key={food.id}>
// 							<Badge variant="secondary">
// 								{food.name}
// 							</Badge>
// 						</li>
// 					))}
// 				</ul>
// 				<div className="flex flex-row justify-between">
// 					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
// 						{formatPostDate(blog.created_at)}
// 					</p>
// 					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
// 						{"@" + blog?.author?.username}
// 					</p>
// 				</div>
// 				<h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
// 					{blog.title}
// 				</h3>
// 			</div>
// 		</PageTemplate>
// 	);
