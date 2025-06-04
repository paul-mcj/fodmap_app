import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			await axios.post(
				"http://127.0.0.1:8000/api/users/token/",
				{
					username,
					password
				},
				{ withCredentials: true } // crucial so that cookies (like access/refresh tokens) are set on the browser.
			);

			// if login is successful fetch the user info
			const res = await axios.get(
				"http://127.0.0.1:8000/api/users/me/",
				{
					withCredentials: true
				}
			);

			console.log("Login successful!!");

			const user = res.data;

			// navigate to user homepage, and just display their name and bio for testing:
			navigate("/dashboard", { state: { user } });
		} catch (err) {
			console.error(err);
			console.log("login failed!!");
		}
	};

	return (
		<>
			<p>Already a user? Login here:</p>
			<form onSubmit={handleLogin}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					type="password"
				/>
				<button type="submit">Login</button>
			</form>
		</>
	);
};

export default LoginForm;
