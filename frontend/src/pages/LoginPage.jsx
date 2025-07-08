import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { privateLogin, privateGetUserData } from "../utils/api_req";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// FIXME: should work for either username or email as long as either matches the password it should authenticate
			await privateLogin({ username, password });

			// if login is successful fetch the user info
			const res = await privateGetUserData();
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
		<div className={cn("flex flex-col gap-6")}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your username or email below to login to
						your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="email">
									Username or Email
								</Label>
								<Input
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									id="email"
									type="email"
									placeholder="m@example.com"
									required
								/>
							</div>
							<div className="grid gap-3">
								<div className="flex items-center">
									<Label htmlFor="password">
										Password
									</Label>
									<Link
										to="/forgot-password"
										className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
										Forgot your password?
									</Link>
								</div>
								<Input
									value={password}
									id="password"
									type="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									required
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									onClick={handleLogin}
									className="w-full">
									Login
								</Button>
								<Button
									variant="outline"
									className="w-full">
									Login with Google
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?&nbsp;
							<Link
								to="/register"
								className="underline underline-offset-4">
								Signup
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);

	// return (
	// 	<>
	// 		<p>
	// 			Already a user? Login here (you can use your username or
	// 			email):
	// 		</p>
	// 		<form onSubmit={handleLogin}>
	// 			<input
	// 				value={username}
	// 				onChange={(e) => setUsername(e.target.value)}
	// 				placeholder="Username or Email"
	// 			/>
	// 			<input
	// 				value={password}
	// 				onChange={(e) => setPassword(e.target.value)}
	// 				placeholder="Password"
	// 				type="password"
	// 			/>
	// 			<button type="submit">Login</button>
	// 		</form>
	// 	</>
	// );
};

export default LoginPage;
