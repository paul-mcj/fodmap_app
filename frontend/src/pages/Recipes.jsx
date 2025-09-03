import BlogList from "@/components/blog/BlogList";
import { useAuth } from "@/context/AuthContext";

const Recipes = () => {
	const { isAuthenticated } = useAuth();

	return (
		<>
			<div className="h-100 md:h-[80dvh] mt-2 md:mt-8 flex flex-col bg-[url('https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat rounded-2xl">
				<div
					className={`bg-black mt-auto ${
						isAuthenticated && "rounded-b-2xl"
					}`}>
					<div className="w-2/3 md:max-w-lg ps-4 py-4 md:ps-10 md:pb-10">
						<h2 className="text-xl md:text-3xl lg:text-5xl text-white">
							Recipes
						</h2>
					</div>
				</div>
			</div>
			{/* <FoodList /> */}
			<BlogList type="recipes" />
		</>
	);
};

export default Recipes;
