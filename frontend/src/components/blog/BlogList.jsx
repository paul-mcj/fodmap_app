import {
	publicGetAllBlogs,
	publicGetAllBlogsOfType,
	privateGetUserBlogs
} from "../../utils/api_req";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import BlogItem from "./BlogItem";
import PageHeader from "../PageHeader";
import { useLocation } from "react-router-dom";

const BlogList = ({ type }) => {
	const location = useLocation();
	const { isAuthenticated } = useAuth();
	const [blogs, setBlogs] = useState([]);

	const pageHeader = (() => {
		if (type === "") return "Recent Blogs";
		if (type === "discussions")
			return location.pathname === "/discussions/"
				? "Recent Discussions"
				: "Your Discussions";
		if (type === "recipes")
			return location.pathname === "/recipes/"
				? "Recent Recipes"
				: "Your Recipes";
		return ""; // default
	})();

	const pageDescription = (() => {
		if (type === "")
			return "Your newest source of FODMAP discussions and recipes.";
		if (type === "discussions")
			return location.pathname === "/discussions/"
				? "Participate in discussions with other members of the FODMAP community."
				: "Filter, organize, view, modify or delete any discussions created by you.";
		if (type === "recipes")
			return location.pathname === "/recipes/"
				? "View FODMAP recipes created by other users in the community."
				: "Filter, organize, view, modify or delete any recipes created by you.";
		return ""; // default
	})();

	// initial data fetch
	useEffect(() => {
		type === "";
		publicGetAllBlogs()
			.then((res) => {
				console.log("API returned:", res.data);
				setBlogs(() => res.data);
				console.log("blogs complete");
			})
			.catch((error) => {
				console.log(`Error with BlogList useEffect: ${error}`);
			});

		type === "discussions" && location.pathname === "/discussions/";
		publicGetAllBlogsOfType("discussions")
			.then((res) => {
				console.log("Discussions returned:", res.data);
				setBlogs(() => res.data);
			})
			.catch((error) => {
				console.log(`Error with Discussions useEffect: ${error}`);
			});

		// type === "discussions" && location.pathname === "/blogs/my"

		type === "recipes" && location.pathname === "/recipes/";
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
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
					<PageHeader text={pageHeader} />
				</h2>
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					{pageDescription}
				</p>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 lg:mb-14">
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
