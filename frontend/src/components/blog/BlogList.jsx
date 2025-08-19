import {
	publicGetAllBlogs,
	publicGetAllBlogsOfType
} from "../../utils/api_req";
import { useState, useEffect } from "react";
import CardTemplate from "../CardTemplate";
import BlogItem from "./BlogItem";

const BlogList = ({ type }) => {
	const [blogs, setBlogs] = useState([]);
	console.log(blogs);

	// initial data fetch
	useEffect(() => {
		type === "" &&
			publicGetAllBlogs()
				.then((res) => {
					console.log("API returned:", res.data);
					setBlogs(() => res.data);
					console.log("blogs complete");
				})
				.catch((error) => {
					console.log(`Error with BlogList useEffect: ${error}`);
				});

		type === "discussions" &&
			publicGetAllBlogsOfType("discussions")
				.then((res) => {
					console.log("Discussions returned:", res.data);
					setBlogs(() => res.data);
				})
				.catch((error) => {
					console.log(
						`Error with Discussions useEffect: ${error}`
					);
				});

		type === "recipes" &&
			publicGetAllBlogsOfType("recipes")
				.then((res) => {
					console.log("Recipes returned:", res.data);
					setBlogs(() => res.data);
				})
				.catch((error) => {
					console.log(`Error with Recipes useEffect: ${error}`);
				});
	}, [type]);

	return (
		// 	{/* TODO: later add search bar for foods to filter, or “type=recipe” or “type=discussion”, etc. */}
		// TODO: limit to maybe 10, then have two buttons: one to go to reipes, one to go to discussions
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
					{type === "" && "Recent Blogs"}
					{type === "discussions" && "Recent Discussions"}
					{type === "recipes" && "Recent Recipes"}
				</h2>
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					{type === "" &&
						"Your newest source of FODMAP discussions and recipes."}
					{type === "discussions" &&
						"Participate in discussions with other members of the FODMAP community"}
					{type === "recipes" &&
						"View FODMAP recipes created by other users in the community"}
				</p>
			</div>
			{/* Grid */}
			<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
				{blogs.map((blog) => (
					<BlogItem
						key={blog.id}
						blog={blog}
					/>
				))}
			</div>
		</div>
	);
};

export default BlogList;
