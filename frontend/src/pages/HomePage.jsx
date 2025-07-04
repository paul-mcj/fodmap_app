import FoodList from "../components/FoodList";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";

function HomePage() {
	return (
		<div>
			<Navbar />
			<h2>Home Page</h2>
			<FoodList />
			<BlogList />
		</div>
	);
}

export default HomePage;
