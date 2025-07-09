import FoodList from "../components/FoodList";
import BlogList from "../components/BlogList";

function HomePage() {
	return (
		<>
			<h2>Welcome Home</h2>
			<FoodList />
			<BlogList />
		</>
	);
}

export default HomePage;
