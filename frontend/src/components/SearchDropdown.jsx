import { useState, useEffect, useRef } from "react";

export default function SearchDropdown({
	query,
	items,
	onQueryChange,
	onSelect,
	placeholder = "Search...",
	maxItems = 20,
	onClose // optional callback for when dropdown closes
}) {
	const [highlightIndex, setHighlightIndex] = useState(-1);
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef(null);
	const itemRefs = useRef([]);

	// useEffect(() => {
	// 	setHighlightIndex(-1);
	// 	setIsOpen(items?.length > 0);
	// }, [items]);

	useEffect(() => {
		setHighlightIndex(-1);
		// Open dropdown whenever input is focused
		if (document.activeElement === inputRef.current) {
			setIsOpen(true);
		}
	}, [items, query]);

	const handleClear = () => {
		setHighlightIndex(-1);
		onQueryChange(""); // clear input in parent
		setIsOpen(false);
		inputRef.current?.focus();
		if (onClose) onClose();
	};

	const handleKeyDown = (e) => {
		const visibleItems = items?.slice(0, maxItems) || [];
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setHighlightIndex((prev) =>
				prev < visibleItems.length - 1 ? prev + 1 : 0
			);
			setIsOpen(true);
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			setHighlightIndex((prev) =>
				prev > 0 ? prev - 1 : visibleItems.length - 1
			);
			setIsOpen(true);
		}
		if (e.key === "Enter" && highlightIndex >= 0) {
			e.preventDefault();
			onSelect(visibleItems[highlightIndex]);
			handleClear();
		}
		if (e.key === "Escape") {
			e.preventDefault();
			handleClear();
		}
		if (e.key === "Tab") {
			e.preventDefault();
			if (visibleItems.length === 0) return;

			if (e.shiftKey) {
				if (highlightIndex === -1) {
					setHighlightIndex(visibleItems.length - 1);
				} else if (highlightIndex > 0) {
					setHighlightIndex(highlightIndex - 1);
				} else {
					setHighlightIndex(-1);
					inputRef.current?.focus();
				}
			} else {
				if (highlightIndex === -1) {
					setHighlightIndex(0);
				} else if (highlightIndex < visibleItems.length - 1) {
					setHighlightIndex(highlightIndex + 1);
				} else {
					setHighlightIndex(-1);
					inputRef.current?.focus();
				}
			}
		}
	};

	useEffect(() => {
		if (highlightIndex >= 0 && itemRefs.current[highlightIndex]) {
			itemRefs.current[highlightIndex].scrollIntoView({
				block: "nearest"
			});
		}
	}, [highlightIndex]);

	const shouldShowList = isOpen && items?.length > 0 && query.length > 0;

	return (
		<div className="relative w-full">
			<div className="relative">
				<input
					ref={inputRef}
					value={query}
					onChange={(e) => onQueryChange(e.target.value)}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsOpen(true)} // <-- always open on focus
					placeholder={placeholder}
					aria-expanded={isOpen}
					aria-autocomplete="list"
					role="combobox"
					className="w-full border border-gray-300 rounded px-2 py-1 pr-10"
				/>

				{/* Clear button */}
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
						aria-label="Clear search">
						×
					</button>
				)}
			</div>

			{/* {isOpen && items?.length > 0 && ( */}
			{shouldShowList && (
				<ul
					className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto shadow-lg"
					role="listbox">
					{items
						.sort((a, b) => {
							const q = query.toLowerCase();
							const aName = a.name.toLowerCase();
							const bName = b.name.toLowerCase();
							const aStarts = aName.startsWith(q) ? 0 : 1;
							const bStarts = bName.startsWith(q) ? 0 : 1;
							if (aStarts !== bStarts)
								return aStarts - bStarts;
							return aName.localeCompare(bName);
						})
						.slice(0, maxItems)
						.map((item, index) => (
							<li
								key={item.id}
								ref={(el) =>
									(itemRefs.current[index] = el)
								}
								role="option"
								aria-selected={highlightIndex === index}
								className={`flex items-center px-2 py-1 cursor-pointer ${
									highlightIndex === index
										? "bg-gray-200"
										: "hover:bg-gray-100"
								}`}
								onMouseEnter={() =>
									setHighlightIndex(index)
								}
								onMouseDown={(e) => {
									e.preventDefault();
									onSelect(item);
									handleClear();
								}}>
								{item.name}
							</li>
						))}
				</ul>
			)}
		</div>
	);
}
