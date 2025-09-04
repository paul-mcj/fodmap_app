import BlogList from "@/components/blog/BlogList";

const UserBlogs = () => {
	return (
		<>
			<div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
				<div className="max-w-[85rem] mx-auto">
					{/* <div className="mx-auto text-center"> */}
					{/* <div className="grid sm:grid-cols-3 gap-6"> */}
					<BlogList type="discussions" />
					{/* TODO: fetch the last post logged in user made as per timestamp (fetch on back or front end for efficiency?) */}
					{/* TODO: this card always needs a special default image */}
					{/* <DashboardCard
								badgeText="Last Post"
								title="d89w32hjr893"
								text="lorme sajisj dsioad89 dsa8d9wd dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43 dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf43
						dwq0d9uqw ej32u49320 f3209trj3 f0329jmfiwe4jtoiwe g430jf4343g0ruew9fgjr gvu 9rehwg9urg"
								linkText="Read more"
								imgRef="https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
							/> */}
					{/* </div> */}
					{/* </div> */}
				</div>
			</div>
		</>
	);
};

export default UserBlogs;
