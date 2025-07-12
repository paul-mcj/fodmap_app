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
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
	const { setIsAuthenticated, setUser } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			// Login the user
			await privateLogin({ username, password });

			// Fetch user details after login
			const res = await privateGetUserData();
			setUser(() => res.data);
			setIsAuthenticated(() => true);

			// Navigate to dashboard
			navigate("/dashboard", { replace: true });
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
					<CardTitle>Welcome Back!</CardTitle>
					<CardDescription>
						Login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="username">
									Username
								</Label>
								<Input
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									id="username"
									type="text"
									placeholder="Username"
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
									className="w-full">
									Login
								</Button>
								{/* <Button
									variant="outline"
									className="w-full">
									Login with Google
								</Button> */}
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
};

export default LoginPage;
