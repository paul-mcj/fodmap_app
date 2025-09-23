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
import { privatePostNewDiscussion } from "@/utils/api_req";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { publicGetAllFoods, publicSearchFoods } from "@/utils/api_req";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";

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
	type: "discussion",
	description: "",
	imgSrc: "",
	foods: [] // IDs of selected foods
};

// Initial search foods state
const initialSearchFoodState = {
	query: "",
	filteredFoods: [] // foods returned from backend search
};

const DiscussionForm = () => {
	const [state, dispatch] = useReducer(formReducer, initialFormState);
	const [searchFoodState, searchFoodDispatch] = useReducer(
		searchFoodReducer,
		initialSearchFoodState
	);

	const [allFoods, setAllFoods] = useState([]);

	// controls dropdown visibility
	const [isModalOpen, setIsModalOpen] = useState(false);
	const searchRef = useRef(null);

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

	// Handle dropdown click outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target)
			) {
				setIsModalOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleInputFocus = () => setIsModalOpen(true);

	const handleSearchOnClose = () => {
		searchFoodDispatch({
			type: "SET_QUERY",
			value: ""
		});
	};

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
		<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto bg-white">
			<div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
				<PageHeader text="New Discussion" />
				<p className="mt-1 text-gray-600 dark:text-neutral-400">
					Something on your mind? Create a new discussion and
					start the conversation with other members of the FODMAP
					Community.
				</p>
			</div>
			{/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 lg:mb-14"> */}
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
									<div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
										<Search className="size-4 shrink-0" />
									</div>

									{/* ||| */}
									<div
										className="relative"
										ref={searchRef}>
										<input
											type="text"
											className="py-2 ps-10 pe-16 block w-full bg-white border border-gray-200 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 focus:ring-blue-500 checked:border-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
											placeholder="Search foods..."
											value={
												searchFoodState.query
											}
											onChange={(e) =>
												searchFoodDispatch({
													type: "SET_QUERY",
													value: e.target
														.value
												})
											}
											onFocus={
												handleInputFocus
											}
										/>
										<div className="absolute inset-y-0 end-0 flex items-center z-20 pe-1">
											<button
												type="button"
												className="cursor-pointer inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
												aria-label="Close"
												onClick={
													handleSearchOnClose
												}>
												<span className="sr-only">
													{/* TODO: erase current value in searchbar */}
													Close
												</span>
												<svg
													className="shrink-0 size-4"
													xmlns="http://www.w3.org/2000/svg"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round">
													<circle
														cx="12"
														cy="12"
														r="10"
													/>
													<path d="m15 9-6 6" />
													<path d="m9 9 6 6" />
												</svg>
											</button>
										</div>
										{/* Modal is open for food tags */}
										{isModalOpen &&
											searchFoodState
												?.filteredFoods
												?.length > 0 && (
												<div className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-lg">
													{searchFoodState.filteredFoods
														.sort(
															(
																a,
																b
															) => {
																const query =
																	searchFoodState.query.toLowerCase();
																const aName =
																	a.name.toLowerCase();
																const bName =
																	b.name.toLowerCase();

																const aStarts =
																	aName.startsWith(
																		query
																	)
																		? 0
																		: 1;
																const bStarts =
																	bName.startsWith(
																		query
																	)
																		? 0
																		: 1;
																if (
																	aStarts !==
																	bStarts
																)
																	return (
																		aStarts -
																		bStarts
																	);

																return aName.localeCompare(
																	bName
																); // alphabetic tie-breaker
															}
														)
														/* Limit to 20 items in dropdown */
														.slice(
															0,
															20
														)
														.map(
															(
																food
															) => (
																<FormControl
																	className="cursor-pointer"
																	onClick={() =>
																		dispatch(
																			{
																				type: "TOGGLE_FOOD",
																				food: food.id
																			}
																		)
																	}>
																	<FormItem
																		key={
																			food.id
																		}
																		className="flex items-center px-2 py-1 hover:bg-gray-100">
																		<FormLabel className="text-sm cursor-pointer">
																			{state.foods.includes(
																				food.id
																			) && (
																				<>
																					<Check className="size-4 mr-1 shrink-0 group-hover:visible" />
																				</>
																			)}
																			{
																				food.name
																			}
																		</FormLabel>
																	</FormItem>
																</FormControl>
															)
														)}
												</div>
											)}
									</div>
									{/* ||| */}
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

export default DiscussionForm;
