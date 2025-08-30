import "./App.css";
import {
	Navigate,
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./routes/RequireAuth";
import BlogDetail from "./pages/BlogDetail";
import Discussions from "./pages/Discussions";
import Recipes from "./pages/Recipes";
import MainFooter from "./components/MainFooter";
import DashboardMainWrapper from "./components/dashboard/DashboardMainWrapper";
import { useAuth } from "./context/AuthContext";

function App() {
	const { isAuthenticated } = useAuth();

	const routes = (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			{/* redirect users away from /dashboard if not logged-in */}
			{!isAuthenticated && (
				<Route
					path="/dashboard/"
					element={
						<Navigate
							to="/login/"
							replace
						/>
					}
				/>
			)}
			<Route
				path="/dashboard/"
				element={
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				}
			/>
			{/* Only show login + register routes if NOT logged in */}
			{!isAuthenticated && (
				<>
					<Route
						path="/login/"
						element={<LoginPage />}
					/>
					<Route
						path="/register/"
						element={<RegisterPage />}
					/>
				</>
			)}
			<Route
				path="/blogs/:id/"
				element={<BlogDetail />}
			/>
			<Route
				path="/discussions/"
				element={<Discussions />}
			/>
			<Route
				path="/recipes/"
				element={<Recipes />}
			/>
			{/* redirect logged-in users away from /login or /register */}
			{isAuthenticated && (
				<>
					<Route
						path="/login/"
						element={
							<Navigate
								to="/dashboard/"
								replace
							/>
						}
					/>
					<Route
						path="/register/"
						element={
							<Navigate
								to="/dashboard/"
								replace
							/>
						}
					/>
				</>
			)}
		</Routes>
	);

	return (
		// <Router>
		// 	{!isAuthenticated && (
		// 		<>
		// 			<Navbar />
		// 			{routes}
		// 			<MainFooter />
		// 		</>
		// 	)}
		// 	{isAuthenticated && (
		// 		<DashboardMainWrapper>{routes}</DashboardMainWrapper>
		// 	)}
		// </Router>
		<Router>
			{!isAuthenticated ? (
				<>
					<Navbar />
					{routes}
					<MainFooter />
				</>
			) : (
				<DashboardMainWrapper>{routes}</DashboardMainWrapper>
			)}
		</Router>
	);
}

export default App;
