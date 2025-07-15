import { publicGetAllBlogs } from "../../utils/api_req";
import { useState, useEffect } from "react";
import CardTemplate from "../CardTemplate";
import BlogItem from "./BlogItem";

const BlogList = () => {
	const [blogs, setBlogs] = useState([]);

	// initial data fetch
	useEffect(() => {
		publicGetAllBlogs()
			.then((res) => {
				console.log(res.data);
				setBlogs(() => res.data);
				console.log("blogs complete");
			})
			.catch((error) => {
				console.log(`Error with BlogList useEffect: ${error}`);
			});
	}, []);

	return (
		// 	{/* TODO: later add search bar for foods to filter, or “type=recipe” or “type=discussion”, etc. */}
		// TODO: limit to maybe 10, then have two buttons: one to go to reipes, one to go to discussions
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
					Recent Blogs
				</h2>
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					Your newest source of FODMAP discussions and recipes.
				</p>
			</div>
			{/* Grid */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
				{blogs.map((blog) => (
					<BlogItem
						key={blog.id}
						// TODO: linkRef needs to point to api backend for blog post id
						linkHref={"/"}
						// TODO: imageSrc needs to point to backend as well
						imageSrc={
							"https://images.unsplash.com/photo-1462917882517-e150004895fa?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						}
						author={blog.author}
						title={blog.title}
						foods={blog.foods}
						type={blog.type}
						created_at={blog.created_at}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogList;
