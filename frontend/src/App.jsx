import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PageTemplate from "./pages/PageTemplate";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
	return (
		<>
			<h1>Welcome to FODMAP React!</h1>
			<Router>
				<Navbar />
				<PageTemplate>
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
				</PageTemplate>
			</Router>
		</>
	);
}

export default App;
