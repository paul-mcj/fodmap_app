import { useEffect, useRef, useState } from "react";
import BannerChoiceItem from "./BannerChoiceItem";
import { colors, gradients, animals, foods, nature } from "@/assets/banners";

const BannerChoices = ({ category, selection, setBannerSelection }) => {
	const gridRef = useRef(null);
	const totalItems = 12;

	// Create refs dynamically
	const itemRefs = Array.from({ length: totalItems }, () => useRef(null));

	const [origins, setOrigins] = useState(Array(totalItems).fill("50% 50%"));

	const getOriginForItem = (index, totalCols) => {
		const row = Math.floor(index / totalCols);
		const col = index % totalCols;
		const totalRows = Math.ceil(totalItems / totalCols);

		const isTop = row === 0;
		const isBottom = row === totalRows - 1;
		const isLeft = col === 0;
		const isRight = col === totalCols - 1;

		// Corners first
		if (isTop && isLeft) return "0% 0%"; // top-left
		if (isTop && isRight) return "100% 0%"; // top-right
		if (isBottom && isLeft) return "0% 100%"; // bottom-left
		if (isBottom && isRight) return "100% 100%"; // bottom-right

		// Edges (not corners)
		if (isTop) return "50% 0%"; // top edge
		if (isBottom) return "50% 100%"; // bottom edge
		if (isLeft) return "0% 50%"; // left edge
		if (isRight) return "100% 50%"; // right edge

		// Center items
		return "50% 50%";
	};

	// Recalculate origins on mount and resize
	useEffect(() => {
		const calculateOrigins = () => {
			if (!gridRef.current) return;

			const width = window.innerWidth;
			const totalCols = width >= 640 ? 6 : 4; // sm breakpoint

			const newOrigins = itemRefs.map((_, idx) =>
				getOriginForItem(idx, totalCols)
			);

			setOrigins(newOrigins);
		};

		calculateOrigins();
		window.addEventListener("resize", calculateOrigins);
		return () => window.removeEventListener("resize", calculateOrigins);
	}, []);

	return (
		<div
			ref={gridRef}
			className="grid mb-4 grid-cols-4 gap-6 sm:grid-cols-6 sm:mb-8">
			{category === "Solid Colours" &&
				colors.map((item, idx) => (
					<BannerChoiceItem
						key={idx}
						ref={itemRefs[idx]}
						color={item.color}
						name={item.name}
						selection={selection}
						setBannerSelection={setBannerSelection}
						transformOrigin={origins[idx]}
					/>
				))}
			{category === "Gradients" &&
				gradients.map((item, idx) => (
					<BannerChoiceItem
						key={idx}
						ref={itemRefs[idx]}
						color={item.color}
						name={item.name}
						selection={selection}
						setBannerSelection={setBannerSelection}
						transformOrigin={origins[idx]}
					/>
				))}
			{category === "Animals" &&
				animals.map((item, idx) => (
					<BannerChoiceItem
						key={idx}
						ref={itemRefs[idx]}
						imgSrc={item.imgSrc}
						name={item.name}
						selection={selection}
						setBannerSelection={setBannerSelection}
						transformOrigin={origins[idx]}
					/>
				))}
			{category === "Nature" &&
				nature.map((item, idx) => (
					<BannerChoiceItem
						key={idx}
						ref={itemRefs[idx]}
						imgSrc={item.imgSrc}
						name={item.name}
						selection={selection}
						setBannerSelection={setBannerSelection}
						transformOrigin={origins[idx]}
					/>
				))}
			{category === "Foods" &&
				foods.map((item, idx) => (
					<BannerChoiceItem
						key={idx}
						ref={itemRefs[idx]}
						imgSrc={item.imgSrc}
						name={item.name}
						selection={selection}
						setBannerSelection={setBannerSelection}
						transformOrigin={origins[idx]}
					/>
				))}
		</div>
	);
};

export default BannerChoices;
