import { useNavigate } from "react-router-dom";
import { privateLogout } from "@/utils/api_req";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const LogoutButton = () => {
	const navigate = useNavigate();
	const { setIsAuthenticated, setUser } = useAuth();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await privateLogout();
			// update global state
			setIsAuthenticated(() => false);
			setUser(() => null);
			navigate("/"); // navigate home
		} catch (err) {
			console.error(
				"Login failed:",
				err?.response?.data?.detail || err.message
			);
		}
	};

	return (
		<Button
			variant="destructive"
			className="cursor-pointer"
			onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default LogoutButton;
