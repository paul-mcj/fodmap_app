import { createContext, useContext, useState, useEffect } from "react";
import { privateGetUserData } from "../utils/api_req";

const AuthContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: () => {},
	user: null,
	setUser: () => {}
});

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const verifyUser = async () => {
			try {
				const res = await privateGetUserData();
				setUser(() => res.data);
				setIsAuthenticated(() => true);
			} catch (err) {
				console.error(
					"AuthContext: Failed to verify user",
					err?.response?.data || err.message
				);
				setIsAuthenticated(() => false);
				setUser(() => null);
			} finally {
				setLoading(() => false); // done verifying
			}
		};

		verifyUser();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				user,
				setUser,
				loading
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
