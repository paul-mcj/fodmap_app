import FoodList from "../components/FoodList";
import Navbar from "../components/Navbar";

function HomePage() {
	return (
		<div>
			<Navbar />
			<h2>Home Page</h2>
			<FoodList />
		</div>
	);
}

export default HomePage;
