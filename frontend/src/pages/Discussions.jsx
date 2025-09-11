import BlogList from "@/components/blog/BlogList";

const Discussions = () => {
	return (
		<div className="mt-24">
			<BlogList type="discussions" />
			{/* TODO: when adding searchbar, can also have badges at the top and when the user clicks on them, it will retrieve recipes that only contain recipes with those categories of items included */}
		</div>
	);
};

export default Discussions;
