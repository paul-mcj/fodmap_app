import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<>
			<h1>Welcome to FODMAP React!</h1>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
					<Route
						path="/dashboard"
						element={<Dashboard />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
