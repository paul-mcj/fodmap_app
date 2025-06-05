import axios from "axios";
import { useState } from "react";

const RegisterForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState(undefined);

	const handleRegistration = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(
				"http://127.0.0.1:8000/api/users/register/",
				{
					username,
					password,
					bio,
					profileImage
				}
			);
			console.log(res.data); // “User created successfully”
			// Optionally, redirect to login or auto-login
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
