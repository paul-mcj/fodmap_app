import { useNavigate } from "react-router-dom";
import { privateLogout } from "@/utils/api_req";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
	const navigate = useNavigate();

	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await privateLogout();

			// TODO: Clear local app state (if its put into context API or useState later)
			// navigate home
			navigate("/");
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
			onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default LogoutButton;
