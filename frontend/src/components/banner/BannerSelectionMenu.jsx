"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
	Blend,
	Palette,
	PawPrint,
	ChevronDown,
	Palmtree,
	Soup
} from "lucide-react";

const BannerSelectionMenu = ({ category, setBannerCategory }) => {
	const handleOnClickSolid = () => {
		setBannerCategory(() => "Solid Colours");
	};
	const handleOnClickGradient = () => {
		setBannerCategory(() => "Gradients");
	};
	const handleOnClickAnimal = () => {
		setBannerCategory(() => "Animals");
	};
	const handleOnClickNature = () => {
		setBannerCategory(() => "Nature");
	};
	const handleOnClickFood = () => {
		setBannerCategory(() => "Foods");
	};

	return (
		<Menu
			as="div"
			className="relative inline-block">
			<MenuButton className="cursor-pointer inline-flex w-full border justify-center gap-x-1.5 rounded-md bg-white/10 px-3 py-2 text-sm font-semibold inset-ring-1 inset-ring-white/5 hover:bg-white/20 mb-8">
				{/* TODO: this needs to be gotten from state for default selection of what the actual selection is */}
				<p className="cursor-pointer text-sm flex items-center">
					{category === "Solid Colours" && (
						<Palette className="size-4 shrink-0 mr-4" />
					)}
					{category === "Gradients" && (
						<Blend className="size-4 shrink-0 mr-4" />
					)}
					{category === "Animals" && (
						<PawPrint className="size-4 shrink-0 mr-4" />
					)}
					{category === "Nature" && (
						<Palmtree className="size-4 shrink-0 mr-4" />
					)}
					{category === "Foods" && (
						<Soup className="size-4 shrink-0 mr-4" />
					)}
					{category}
				</p>
				<ChevronDown className="size-4 shrink-0 self-center -mr-1" />
			</MenuButton>
			<MenuItems
				transition
				className="absolute left-0 top-10 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
				<div className="py-1">
					<MenuItem onClick={handleOnClickSolid}>
						<p className="cursor-pointer px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden flex items-center">
							<Palette className="size-4 shrink-0 text-white mr-4" />
							Solid Colours
						</p>
					</MenuItem>
					<MenuItem onClick={handleOnClickGradient}>
						<p className="cursor-pointer px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden flex items-center">
							<Blend className="size-4 shrink-0 text-white mr-4" />
							Gradients
						</p>
					</MenuItem>
					<MenuItem onClick={handleOnClickAnimal}>
						<p className="cursor-pointer px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden flex items-center">
							<PawPrint className="size-4 shrink-0 text-white mr-4" />
							Animals
						</p>
					</MenuItem>
					<MenuItem onClick={handleOnClickNature}>
						<p className="cursor-pointer px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden flex items-center">
							<Palmtree className="size-4 shrink-0 text-white mr-4" />
							Nature
						</p>
					</MenuItem>
					<MenuItem onClick={handleOnClickFood}>
						<p className="cursor-pointer px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden flex items-center">
							<Soup className="size-4 shrink-0 text-white mr-4" />
							Foods
						</p>
					</MenuItem>
				</div>
			</MenuItems>
		</Menu>
	);
};

export default BannerSelectionMenu;
