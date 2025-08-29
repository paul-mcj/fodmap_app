import { Link } from "react-router-dom";

const MainFooter = ({ children }) => {
	return (
		<footer className="w-full mx-auto py-8 text-center text-sm bg-neutral-900 text-neutral-200">
			<ul className="flex flex-col md:flex-row justify-center gap-x-0 gap-y-2 md:gap-y-0 md:gap-x-16">
				<li>
					&copy; {new Date().getFullYear()} FODMAP Community. All
					rights reserved.
				</li>
				<li>
					<Link to="/">Terms</Link>
				</li>
				<li>
					<Link to="#">Privacy</Link>
				</li>
				{children}
			</ul>
		</footer>
	);
};

export default MainFooter;
