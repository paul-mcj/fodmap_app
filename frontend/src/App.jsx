import "./App.css";
import FoodList from "./components/FoodList";
import RegisterForm from "./components/RegisterForm";

function App() {
	return (
		<div>
			<h1>Welcome to FODMAP React!</h1>
			<FoodList />
			<RegisterForm />
		</div>
	);
}

export default App;
