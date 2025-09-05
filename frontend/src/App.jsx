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
import DiscussionsForm from "./pages/DiscussionsForm";
import { useAuth } from "./context/AuthContext";

function App() {
	const { isAuthenticated } = useAuth();

	const routes = (
		<Routes>
			<Route
				path="/"
				element={<HomePage />}
			/>
			<Route
				path="/blogs/:id"
				element={<BlogDetail />}
			/>
			<Route
				path="/discussions"
				element={<Discussions />}
			/>
			<Route
				path="/recipes"
				element={<Recipes />}
			/>
			{/* TODO: 404 not found for anything that doesn't match routes in here */}
			{!isAuthenticated && (
				<>
					{/* Only show login page if NOT logged in */}
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					{/* Only show register page if NOT logged in */}
					<Route
						path="/register"
						element={<RegisterPage />}
					/>
					{/* TODO: redirect users away from the following pages if NOT authenticated */}
					<Route
						path="/dashboard"
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
					<Route
						path="/blogs/my"
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
					<Route
						path="/discussions/my"
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
					<Route
						path="/recipes/my"
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
					<Route
						path="/discussions/new"
						element={
							<Navigate
								to="/login"
								replace
							/>
						}
					/>
				</>
			)}
			{isAuthenticated && (
				<>
					{/* TODO: determine what routes need to be redirected for logged in users*/}
					{/* redirect logged in users away from /login */}
					<Route
						path="/login"
						element={
							<Navigate
								to="/dashboard"
								replace
							/>
						}
					/>
					{/* redirect logged in users away from /register */}
					<Route
						path="/register"
						element={
							<Navigate
								to="/dashboard"
								replace
							/>
						}
					/>
					{/* routes below all require authentication */}
					{/* TODO: determine what routes need to be authenticated */}
					<Route
						path="/dashboard"
						element={
							<RequireAuth>
								<Dashboard />
							</RequireAuth>
						}
					/>
					<Route
						path="/discussions/my"
						element={
							<RequireAuth>
								<Discussions />
							</RequireAuth>
						}
					/>
					<Route
						path="/recipes/my"
						element={
							<RequireAuth>
								<Recipes />
							</RequireAuth>
						}
					/>
					<Route
						path="/discussions/new"
						element={
							<RequireAuth>
								<DiscussionsForm />
							</RequireAuth>
						}
					/>
				</>
			)}
		</Routes>
	);

	return (
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
