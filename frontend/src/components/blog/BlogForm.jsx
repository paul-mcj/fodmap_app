// const initBlog = { title: "", description: "", type: "discussion", foods: [] };

// const BlogForm = ({ onCreateNewBlog }) => {
// 	// TODO: useReducer...
// 	// const [title, setTitle] = useState(initBlog.title);
// 	// const [description, setDescription] = useState(initBlog.description);
// 	// const [type, setType] = useState(initBlog.type);
// 	// const [foods, setFoods] = useState(initBlog.foods);

// 	// TODO: regarding getting app wide food categories so users can tag when making blogs/recipes:
// 	//     Empty dropdown on first render: Your dropdown will render before foods is fetched. So add a check like foods.length > 0 ? render options : show spinner.

// 	// Validation: Decide if selecting at least one food tag should be required for blogs of type "recipe."

// 	// Large datasets: If you ever grow to hundreds of food tags, consider lazy loading or search filtering in the dropdown.
// 	// const [appWideFoods, setAppWideFoods] = useState([]);

// 	const handleCreateBlogEntry = async (e) => {
// 		e.preventDefault();

// 		// const newBlogDetails = {
// 		// 	title,
// 		// 	description,
// 		// 	type,
// 		// 	foods: foods.map(Number)
// 		// };

// 		try {
// 			console.log(newBlogDetails);
// 			await privatePostNewBlog(newBlogDetails);
// 			console.log("new blog has been successfully added!!");

// 			// reset state
// 			setTitle(() => "");
// 			setDescription(() => "");
// 			setFoods(() => []);
// 			setType(() => "discussion");

// 			onCreateNewBlog(); // refresh parent component to display new blog on Dashboard
// 		} catch (err) {
// 			console.error(
// 				"ERROR with creating new Blog:",
// 				err?.response?.data || err.message
// 			);
// 		}
// 	};

// 	return (
// 		<>
// 			<p>Add a new blog entry:</p>
// 			<form onSubmit={handleCreateBlogEntry}>
// 				<input
// 					value={title}
// 					onChange={(e) => setTitle(e.target.value)}
// 					placeholder="Blog title here..."
// 				/>
// 				<input
// 					value={description}
// 					onChange={(e) => setDescription(e.target.value)}
// 					placeholder="Blog description here..."
// 				/>
// 				<fieldset>
// 					<legend>Select a blog type:</legend>

// 					<div>
// 						<input
// 							type="radio"
// 							id="discussion"
// 							name="type"
// 							value="discussion"
// 							checked={type === "discussion"}
// 							onChange={(e) => setType(e.target.value)}
// 						/>
// 						<label htmlFor="discussion">Discussion</label>
// 					</div>
// 					<div>
// 						<input
// 							type="radio"
// 							id="recipe"
// 							name="type"
// 							value="recipe"
// 							checked={type === "discussion"}
// 							onChange={(e) => setType(e.target.value)}
// 						/>
// 						<label htmlFor="recipe">Recipe</label>
// 					</div>
// 				</fieldset>
// 				<fieldset>
// 					<legend>Tags:</legend>
// 					{appWideFoods.map((food) => (
// 						<div key={food.id}>
// 							<input
// 								type="checkbox"
// 								id={`food_tag_${food.id}`} // unique id
// 								value={food.id}
// 								onChange={(e) =>
// 									setFoods((prev) => [
// 										...prev,
// 										e.target.value
// 									])
// 								}
// 							/>
// 							<label htmlFor={`food_tag_${food.id}`}>
// 								{food.name}
// 							</label>
// 						</div>
// 					))}
// 				</fieldset>
// 				<button type="submit">Add Entry</button>
// 			</form>
// 		</>
// 	);
// };

// export default BlogForm;
