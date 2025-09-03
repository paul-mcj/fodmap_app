import { Button } from "@headlessui/react";

const MainFooter = ({ children }) => {
	return (
		<footer className="w-full mx-auto py-8 text-center text-sm bg-neutral-900 text-neutral-200">
			<ul className="flex flex-col md:flex-row justify-center gap-x-0 gap-y-2 md:gap-y-0 md:gap-x-16">
				<li>
					&copy; {new Date().getFullYear()} FODMAP Community. All
					rights reserved.
				</li>
				<li>
					<a href="#">
						{/* TODO: go to terms page */}
						<Button className="cursor-pointer">Terms</Button>
					</a>
				</li>
				<li>
					{/* TODO: go to privacy page */}
					<a href="#">
						<Button className="cursor-pointer">
							Privacy
						</Button>
					</a>
				</li>
				{children}
			</ul>
		</footer>
	);
};

export default MainFooter;
