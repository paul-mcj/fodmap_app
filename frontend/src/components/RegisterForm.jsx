import { useState } from "react";
import { register, getUser, login } from "../utils/api_req";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState(undefined);

	const navigate = useNavigate();

	const handleRegistration = async (e) => {
		e.preventDefault();
		try {
			await register({ username, email, password, bio, profileImage });
			console.log("user created successfully");

			// login new user
			await login({ username, password });

			// fetch their info
			const res = await getUser();
			const user = res.data;

			// navigate to user dashboard
			navigate("/dashboard", { state: { user } });
		} catch (err) {
			console.error(
				"Login failed:",
				err?.response?.data?.detail || err.message
			);
		}
	};

	return (
		<>
			<p>Register as a new user:</p>
			<form onSubmit={handleRegistration}>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder="Username"
				/>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					type="email"
				/>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					type="password"
				/>

				<input
					value={bio}
					onChange={(e) => setBio(e.target.value)}
					placeholder="Bio"
				/>
				<input
					value={profileImage}
					onChange={(e) => setProfileImage(e.target.value)}
					type="file"
					accept="image/png, image/jpeg"
				/>

				<button type="submit">Sign Up</button>
			</form>
		</>
	);
};

export default RegisterForm;
