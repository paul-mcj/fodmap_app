import { useReducer, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { privatePostNewRecipe } from "@/utils/api_req";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { publicGetAllFoods, publicSearchFoods } from "@/utils/api_req";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import SearchDropdown from "@/components/SearchDropdown";

// Reducer for form state
function formReducer(state, action) {
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
		case "REMOVE_FOOD":
			return {
				...state,
				foods: state.foods.filter((id) => id !== action.food)
			};

		default:
			return state;
	}
}

// Reducer for search foods state
function searchFoodReducer(state, action) {
	switch (action.type) {
		case "SET_QUERY":
			return { ...state, query: action.value };
		case "SET_FILTERED_FOODS":
			return { ...state, filteredFoods: action.foods };
		default:
			return state;
	}
}

// Initial form state
const initialFormState = {
	title: "",
	type: "recipe",
	description: "",
	imgSrc: "",
	foods: [] // IDs of selected foods
};

// Initial search foods state
const initialSearchFoodState = {
	query: "",
	filteredFoods: [] // foods returned from backend search
};

const RecipeForm = () => {
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const [searchFoodState, searchFoodDispatch] = useReducer(
		searchFoodReducer,
		initialSearchFoodState
	);

	const [allFoods, setAllFoods] = useState([]);

	const form = useForm({
		defaultValues: initialFormState
	});

	const fetchFoods = async () => {
		try {
			const res = await publicGetAllFoods();
			const data = await res.data;
			setAllFoods(data);
		} catch (err) {
			console.error("Error fetching foods:", err);
		}
	};

	useEffect(() => {
		fetchFoods();
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchFoodState.query.length > 0) {
				publicSearchFoods(searchFoodState.query)
					.then((data) =>
						searchFoodDispatch({
							type: "SET_FILTERED_FOODS",
							foods: data
						})
					)
					.catch(console.error);
				console.log(searchFoodState);
			} else {
				searchFoodDispatch({
					type: "SET_FILTERED_FOODS",
					foods: []
				});
			}
		}, 300); // debounce

		return () => clearTimeout(delayDebounceFn);
	}, [searchFoodState.query]);

	const handleOnSubmit = async () => {
		console.log(state);
		try {
			await privatePostNewRecipe(state);
			console.log("new recipe has been successfully added!!");
		} catch (err) {
			console.error(
				"ERROR with creating new recipe:",
				err?.response?.data || err.message
			);
		}
	};

	return (
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-white">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<PageHeader text="New Recipe" />
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					Have something delicious that you make and think other
					will like? Create a new recipe and share with the
					FODMAP Community.
				</p>
			</div>
			<div>
				<Card>
					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(
									handleOnSubmit
								)}
								className="space-y-4">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Title
											</FormLabel>
											<FormControl>
												<input
													{...field}
													value={
														state.title
													}
													onChange={(
														e
													) =>
														dispatch({
															type: "SET_FIELD",
															field: "title",
															value: e
																.target
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
								<FormLabel className="mb-2">
									Add food tags
								</FormLabel>
								<div className="relative">
									<SearchDropdown
										isSelected={(item) =>
											state.foods.includes(
												item.id
											)
										}
										query={searchFoodState.query}
										items={
											searchFoodState.filteredFoods
										}
										onQueryChange={(value) =>
											searchFoodDispatch({
												type: "SET_QUERY",
												value
											})
										}
										onSelect={(food) =>
											dispatch({
												type: "TOGGLE_FOOD",
												food: food.id
											})
										}
									/>
								</div>
								<div className="grid gap-2">
									<p
										className={`flex items-center gap-2 text-sm leading-none font-medium ${
											state.foods.length === 0
												? "text-red-500"
												: ""
										}`}>
										{state.foods.length > 0
											? "Current tags added"
											: "No tags have yet been added to your discussion"}
									</p>
									<ul className="flex mt-2 flex-row flex-wrap gap-2 justify-start">
										{state.foods.map((foodId) => {
											const foodObj =
												allFoods.find(
													(f) =>
														f.id ===
														foodId
												);
											if (!foodObj)
												return null;
											return (
												<li
													key={
														foodObj.id
													}
													className="group"
													onClick={() =>
														dispatch({
															type: "REMOVE_FOOD",
															food: foodObj.id
														})
													}>
													<Badge className="hover:bg-red-500 cursor-pointer">
														<div className="flex items-center">
															<X className="size-4 mr-1 shrink-0 group-hover:visible" />
															{
																foodObj.name
															}
														</div>
													</Badge>
												</li>
											);
										})}
									</ul>
								</div>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Description
											</FormLabel>
											<FormControl>
												<textarea
													{...field}
													value={
														state.description
													}
													onChange={(
														e
													) =>
														dispatch({
															type: "SET_FIELD",
															field: "description",
															value: e
																.target
																.value
														})
													}
													className="w-full border rounded px-2 py-1 h-40 resize-y"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									className="mt-8">
									Submit
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default RecipeForm;
