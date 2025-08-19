import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { publicGetSingleBlog } from "@/utils/api_req";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { formatPostDate } from "@/utils/format";

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
		<PageTemplate>
			<h1>{blog.title}</h1>
			<div className="aspect-w-16 aspect-h-9">
				<img
					className="w-full object-cover rounded-t-xl"
					// TODO: imageSrc needs to point to backend as well
					src={
						"https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					}
					alt={blog.title}
				/>
			</div>
			<div className="p-4 md:p-5 text-left">
				<ul className="flex flex-row justify-evenly flex-wrap">
					<li>
						<Badge>{blog.type}</Badge>
					</li>
					{blog?.foods?.map((food) => (
						<li key={food.id}>
							<Badge variant="secondary">
								{food.name}
							</Badge>
						</li>
					))}
				</ul>
				<div className="flex flex-row justify-between">
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{formatPostDate(blog.created_at)}
					</p>
					<p className="mt-2 text-xs text-gray-600 dark:text-neutral-400">
						{"@" + blog?.author?.username}
					</p>
				</div>
				<h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-white">
					{blog.title}
				</h3>
			</div>
		</PageTemplate>
	);
};

export default BlogDetail;
