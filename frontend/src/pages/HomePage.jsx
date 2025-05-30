import { Link } from "react-router-dom";
import FoodList from "../components/FoodList";

function HomePage() {
	return (
		<div>
			<h2>Home Page</h2>
			<FoodList />

			<nav>
				<Link to="/login">Login</Link> |{" "}
				<Link to="/register">Signup</Link>
			</nav>
		</div>
	);
}

export default HomePage;
