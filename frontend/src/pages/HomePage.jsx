import FoodList from "../components/FoodList";
import BlogList from "../components/blog/BlogList";
import { useAuth } from "@/context/AuthContext";

function HomePage() {
	const { isAuthenticated } = useAuth();

	return (
		<>
			<div className="h-100 md:h-[80dvh] mt-2 md:mt-8 flex flex-col bg-[url('https://plus.unsplash.com/premium_photo-1722945761326-19bfe0fee127?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlubmVyJTIwcGFydHl8ZW58MHwwfDB8fHww')] bg-cover bg-center bg-no-repeat rounded-2xl">
				<div
					className={`bg-black mt-auto ${
						isAuthenticated && "rounded-b-2xl"
					}`}>
					<div className="w-2/3 md:max-w-lg ps-4 py-4 md:ps-10 md:pb-10">
						<h2 className="text-xl md:text-3xl lg:text-5xl text-white">
							Welcome to FODMAP Community!
						</h2>
					</div>
				</div>
			</div>
			{/* <FoodList /> */}
			<BlogList type="" />
		</>
	);
}

export default HomePage;
