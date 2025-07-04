import { fetchBlogs } from "../utils/api_req";
import { useState, useEffect } from "react";
import { formatPostDate } from "../utils/format";

const BlogList = () => {
	const [blogs, setBlogs] = useState([]);

	// initial data fetch
	useEffect(() => {
		fetchBlogs()
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
			<h2>BlogList component</h2>
			{/* TODO: later add filters here for “type=recipe” or “type=discussion” */}
			<div>
				<ul>
					{blogs.map((blog) => (
						<li key={blog.id}>
							<div>{blog.author}</div>
							<div>{blog.title}</div>
							<div>{blog.description}</div>
							<div>{blog.type}</div>
							<ul>
								{blog.foods.map((food) => (
									<li key={food.id}>{food.name}</li>
								))}
							</ul>
							<div>{formatPostDate(blog.created_at)}</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default BlogList;
