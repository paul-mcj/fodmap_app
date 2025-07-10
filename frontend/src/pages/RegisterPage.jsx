import { useState } from "react";
import { privateRegistration, privateLogin } from "../utils/api_req";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState(undefined);

	const navigate = useNavigate();

	const handleRegistration = async (e) => {
		e.preventDefault();
		try {
			await privateRegistration({
				username,
				email,
				password,
				bio,
				profileImage
			});
			console.log("user created successfully");

			// login new user
			await privateLogin({ username, password });

			navigate("/login");
			// TODO: update alert that they can now tyr to log in
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
				{/* TODO: add a confirm password field that matches before the form can even attempt to be validated */}
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

export default RegisterPage;
