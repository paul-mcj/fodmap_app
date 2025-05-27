import axios from "axios";
import { useEffect, useState } from "react";

const FoodList = () => {
	const [foods, setFoods] = useState([]);
	const [users, setUsers] = useState([]);
	const [posts, setPosts] = useState([]);

	// initial data fetch
	useEffect(() => {
		axios.get("http://127.0.0.1:8000/api/foods")
			.then((res) => {
				setFoods(() => res.data);
				console.log("foods complete");
			})
			.catch((error) => {
				console.log(`Error with FoodList useEffect: ${error}`);
			});

		axios.get("http://127.0.0.1:8000/api/posts")
			.then((res) => {
				setPosts(() => res.data);
				console.log("users complete");
			})
			.catch((error) => {
				console.log(
					`Error with FoodList useEffect (users api call): ${error}`
				);
			});

		axios.get("http://127.0.0.1:8000/api/users")
			.then((res) => {
				setUsers(() => res.data);
				console.log("posts complete");
			})
			.catch((error) => {
				console.log(
					`Error with FoodList useEffect (posts api call): ${error}`
				);
			});
	}, []);

	return (
		<>
			<h2>FoodList component</h2>
			<div>
				<ul>
					{foods.map((food) => (
						<li key={food.id}>
							<div>{food.name}</div>
							<div>{food.trigger_level}</div>
							<div>{food.category}</div>
						</li>
					))}
				</ul>
			</div>
			<div>
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							<div>{user.username}</div>
							<div>{user.bio}</div>
							<div>{user.profile_image}</div>
						</li>
					))}
				</ul>
			</div>
			<div>
				<ul>
					{posts.map((post) => (
						<li key={post.id}>
							<div>{post.body}</div>
							<div>{post.created_at}</div>
							<div>{post.author}</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default FoodList;
