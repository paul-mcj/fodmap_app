import FoodList from "../components/FoodList";
import BlogList from "../components/blog/BlogList";

function HomePage() {
	return (
		<>
			<div className="pt-6 px-4 sm:px-6 lg:px-8 mt-12">
				<div className="h-100 md:h-[80dvh] flex flex-col bg-[url('https://images.unsplash.com/photo-1489444444961-d0fda97f0986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat rounded-2xl">
					<div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10">
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
