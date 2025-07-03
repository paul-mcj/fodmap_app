import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUser } from "../utils/api_req";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// FIXME: should work for either username or email as long as either matches the password it should authenticate
			await login({ username, password });

			// if login is successful fetch the user info
			const res = await getUser();
			const user = res.data;
			console.log(user);
			console.log("Login successful!!");

			// navigate to user dashboard
			navigate("/dashboard", { state: { user } });
		} catch (err) {
			console.error(
				"Login failed:",
				err?.response?.data?.detail || err.message
			);
			console.log("login failed!!");
		}
	};

	return (
		<>
			<p>
				Already a user? Login here (you can use your username or
				email):
			</p>
			<form onSubmit={handleLogin}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username or Email"
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
