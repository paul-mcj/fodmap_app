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
		<>
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
					Recent Blogs
				</h2>
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					Your newest source of FODMAP discussions and recipes.
				</p>
			</div>
			{/* TODO: later add search bar for foods to filter, or “type=recipe” or “type=discussion”, etc. */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
				<ul>
					{blogs.map((blog) => (
						<li key={blog.id}>
							<BlogItem
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
							<CardTemplate
								author={blog.author}
								title={blog.title}
								description={blog.description}
								type={blog.type}
								foods={blog.foods}
								created_at={blog.created_at}
							/>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default BlogList;
