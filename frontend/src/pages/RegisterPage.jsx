import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	privateRegistration,
	publicCheckUsername,
	publicCheckEmail
} from "../utils/api_req";
import { useDebouncedValidation } from "@/hooks/useDebouncedValidation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import PageTemplate from "./PageTemplate";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const RegisterPage = () => {
	const navigate = useNavigate();

	// Form state
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState(null);

	// Local validation errors
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	// API validation
	const { isValid: usernameAvailable, status: usernameStatus } =
		useDebouncedValidation(
			username,
			publicCheckUsername,
			500,
			!errors.username // only check API if local passes
		);
	const { isValid: emailAvailable, status: emailStatus } =
		useDebouncedValidation(email, publicCheckEmail, 500, !errors.email);

	// Form is valid if local + API checks pass
	const isFormValid =
		username &&
		email &&
		password &&
		confirmPassword &&
		!Object.values(errors).some((err) => err) &&
		usernameAvailable &&
		emailAvailable;

	// Local username validation
	useEffect(() => {
		if (!username) {
			setErrors((prev) => ({ ...prev, username: "" }));
			return;
		}
		if (username.length < 3) {
			setErrors((prev) => ({
				...prev,
				username: "Must be at least 3 characters"
			}));
		} else if (username.length > 20) {
			setErrors((prev) => ({
				...prev,
				username: "Cannot exceed 20 characters"
			}));
		} else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
			setErrors((prev) => ({
				...prev,
				username: "Only letters, numbers, underscores allowed"
			}));
		} else {
			setErrors((prev) => ({ ...prev, username: "" }));
		}
	}, [username]);

	// Local email validation
	useEffect(() => {
		if (!email) {
			setErrors((prev) => ({ ...prev, email: "" }));
			return;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setErrors((prev) => ({
				...prev,
				email: "Invalid email address"
			}));
		} else {
			setErrors((prev) => ({ ...prev, email: "" }));
		}
	}, [email]);

	// Local password validation
	useEffect(() => {
		if (!password) {
			setErrors((prev) => ({ ...prev, password: "" }));
			return;
		}
		if (password.length < 8) {
			setErrors((prev) => ({
				...prev,
				password: "Must be at least 8 characters"
			}));
		} else if (
			!/[A-Z]/.test(password) ||
			!/[0-9]/.test(password) ||
			!/[!@#$%^&*]/.test(password)
		) {
			setErrors((prev) => ({
				...prev,
				password: "Include uppercase, number, and special character"
			}));
		} else {
			setErrors((prev) => ({ ...prev, password: "" }));
		}
	}, [password]);

	// Local confirm password validation
	useEffect(() => {
		if (!confirmPassword) {
			setErrors((prev) => ({ ...prev, confirmPassword: "" }));
			return;
		}
		if (confirmPassword !== password) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: "Passwords do not match"
			}));
		} else {
			setErrors((prev) => ({ ...prev, confirmPassword: "" }));
		}
	}, [confirmPassword, password]);

	// Submit handler
	const handleRegistration = async (e) => {
		e.preventDefault();
		if (!isFormValid) return;

		try {
			await privateRegistration({
				username,
				email,
				password,
				bio,
				profileImage
			});
			console.log("User created successfully");

			//TODO: Show a toast/banner saying “Account created! Please log in to continue”.
			navigate("/login");
		} catch (err) {
			console.error(
				"Registration failed:",
				err?.response?.data?.detail || err.message
			);
		}
	};

	// Validation feedback component
	const ValidationStatus = ({ status, successMsg, failMsg }) => {
		switch (status) {
			case "checking":
				return (
					<p className="text-gray-500 flex items-center gap-1 text-sm">
						<Loader2 className="animate-spin w-4 h-4" />{" "}
						Checking…
					</p>
				);
			case "available":
				return (
					<p className="text-green-500 flex items-center gap-1 text-sm">
						<CheckCircle className="w-4 h-4" /> {successMsg}
					</p>
				);
			case "taken":
				return (
					<p className="text-red-500 flex items-center gap-1 text-sm">
						<XCircle className="w-4 h-4" /> {failMsg}
					</p>
				);
			case "error":
				return (
					<p className="text-red-500 flex items-center gap-1 text-sm">
						<XCircle className="w-4 h-4" /> Could not validate
					</p>
				);
			default:
				return null;
		}
	};

	return (
		<PageTemplate>
			<div className={cn("flex flex-col gap-6")}>
				<Card>
					<CardHeader>
						<CardTitle>Signup for FODMAP Community</CardTitle>
						<CardDescription>
							Create an account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleRegistration}
							className="flex flex-col gap-6">
							{/* Username */}
							<div className="grid gap-2">
								<Label htmlFor="username">
									Username
								</Label>
								<Input
									id="username"
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									type="text"
									placeholder="Username"
									required
								/>
								{errors.username ? (
									<p className="text-red-500 text-sm">
										{errors.username}
									</p>
								) : (
									username && (
										<ValidationStatus
											status={usernameStatus}
											successMsg="Username available"
											failMsg="Username taken"
										/>
									)
								)}
							</div>

							{/* Email */}
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value)
									}
									type="email"
									placeholder="you@example.com"
									required
								/>
								{errors.email ? (
									<p className="text-red-500 text-sm">
										{errors.email}
									</p>
								) : (
									email && (
										<ValidationStatus
											status={emailStatus}
											successMsg="Email available"
											failMsg="Email already in use"
										/>
									)
								)}
							</div>

							{/* Password */}
							<div className="grid gap-2">
								<Label htmlFor="password">
									Password
								</Label>
								<Input
									id="password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									type="password"
									placeholder="••••••••"
									required
								/>
								{errors.password && (
									<p className="text-red-500 text-sm">
										{errors.password}
									</p>
								)}
							</div>

							{/* Confirm Password */}
							<div className="grid gap-2">
								<Label htmlFor="confirmPassword">
									Confirm Password
								</Label>
								<Input
									id="confirmPassword"
									value={confirmPassword}
									onChange={(e) =>
										setConfirmPassword(
											e.target.value
										)
									}
									type="password"
									placeholder="••••••••"
									required
								/>
								{errors.confirmPassword && (
									<p className="text-red-500 text-sm">
										{errors.confirmPassword}
									</p>
								)}
							</div>

							{/* Bio */}
							<div className="grid gap-2">
								<Label htmlFor="bio">
									Bio (optional)
								</Label>
								<Textarea
									id="bio"
									value={bio}
									onChange={(e) =>
										setBio(e.target.value)
									}
									type="text"
									placeholder="Tell us about yourself…"
								/>
							</div>

							{/* Profile Image */}
							<div className="grid gap-2">
								<Label htmlFor="profileImage">
									Profile Picture (optional)
								</Label>
								<Input
									id="profileImage"
									onChange={(e) =>
										setProfileImage(
											e.target.files[0]
										)
									}
									type="file"
									accept="image/png, image/jpeg"
								/>
							</div>

							<Button
								type="submit"
								disabled={!isFormValid}
								className={cn(
									"w-full cursor-pointer",
									!isFormValid &&
										"opacity-50 cursor-not-allowed"
								)}>
								Signup
							</Button>
						</form>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link
								to="/login"
								className="underline underline-offset-4">
								Login
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</PageTemplate>
	);
};

export default RegisterPage;
