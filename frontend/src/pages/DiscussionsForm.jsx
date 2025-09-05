import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { privatePostNewDiscussion } from "@/utils/api_req";
import PageHeader from "@/components/PageHeader";
import { Button } from "@headlessui/react";

// Reducer for form state
function reducer(state, action) {
	switch (action.type) {
		case "SET_FIELD":
			return { ...state, [action.field]: action.value };
		case "TOGGLE_FOOD":
			return {
				...state,
				foods: state.foods.includes(action.food)
					? state.foods.filter((f) => f !== action.food)
					: [...state.foods, action.food]
			};
		default:
			return state;
	}
}

// Initial form state
const initialState = {
	title: "",
	type: "",
	description: "",
	imgSrc: "",
	foods: [] // IDs of selected foods
};

const DiscussionsForm = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const form = useForm({
		defaultValues: initialState
	});

	const handleOnSubmit = async () => {
		console.log(state);
		try {
			await privatePostNewDiscussion(state);
			console.log("new discussion has been successfully added!!");
		} catch (err) {
			console.error(
				"ERROR with creating new discussion:",
				err?.response?.data || err.message
			);
		}
	};

	return (
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<PageHeader text="New Discussion" />
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					Something on your mind? Create a new discussion and
					start the conversation with other members of the FODMAP
					Community.
				</p>
			</div>
			<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 lg:mb-14">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleOnSubmit)}
						className="space-y-4">
						{/* Title */}
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<input
											{...field}
											value={state.title}
											onChange={(e) =>
												dispatch({
													type: "SET_FIELD",
													field: "title",
													value: e.target
														.value
												})
											}
											className="w-full border rounded px-2 py-1"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<textarea
											{...field}
											value={state.description}
											onChange={(e) =>
												dispatch({
													type: "SET_FIELD",
													field: "description",
													value: e.target
														.value
												})
											}
											className="w-full border rounded px-2 py-1"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Type */}
						<FormField
							control={form.control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type</FormLabel>
									<select
										{...field}
										value={state.type}
										onChange={(e) =>
											dispatch({
												type: "SET_FIELD",
												field: "type",
												value: e.target
													.value
											})
										}
										className="w-full border rounded px-2 py-1">
										<option value="">
											Select...
										</option>
										<option value="discussion">
											Discussion
										</option>
										<option value="recipe">
											Recipe
										</option>
									</select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Foods (checkbox list as an example) */}
						<div>
							<FormLabel>Foods</FormLabel>
							{["Tomato", "Cheese", "Avocado"].map(
								(food) => (
									<FormItem
										key={food}
										className="flex items-center space-x-2">
										<FormControl>
											<Checkbox
												checked={state.foods.includes(
													food
												)}
												onCheckedChange={() =>
													dispatch({
														type: "TOGGLE_FOOD",
														food
													})
												}
											/>
										</FormControl>
										<FormLabel className="text-sm">
											{food}
										</FormLabel>
									</FormItem>
								)
							)}
						</div>

						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default DiscussionsForm;
