import { publicGetAllBlogs } from "../utils/api_req";
import { useState, useEffect } from "react";
import CardTemplate from "./CardTemplate";

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
			<h2>BlogList component</h2>
			{/* TODO: later add filters here for “type=recipe” or “type=discussion” */}
			<div>
				<ul>
					{blogs.map((blog) => (
						<li key={blog.id}>
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
