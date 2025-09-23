import { useState, useEffect, useRef } from "react";
import { Check, Search } from "lucide-react";

export default function SearchDropdown({
	query,
	isSelected,
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
	const containerRef = useRef(null);

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

		// If dropdown isn't open or no items to cycle through, let Tab key do its thing
		if (!isOpen || visibleItems.length === 0) {
			if (e.key === "Tab") return; // don't preventDefault
		}

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

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const shouldShowList = isOpen && items?.length > 0 && query.length > 0;

	return (
		<div
			ref={containerRef}
			className="relative w-full">
			<div className="relative">
				<div className="relative w-full">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none size-4" />
					<input
						ref={inputRef}
						value={query}
						onChange={(e) => onQueryChange(e.target.value)}
						onKeyDown={handleKeyDown}
						onFocus={() => setIsOpen(true)}
						placeholder={placeholder}
						aria-expanded={isOpen}
						aria-autocomplete="list"
						role="combobox"
						className="w-full border border-gray-300 rounded-lg pl-9 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				{/* Clear button */}
				{query && (
					<button
						type="button"
						onClick={handleClear}
						className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
						aria-label="Clear search">
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
				)}
			</div>
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
								{isSelected && isSelected(item) && (
									<Check className="size-4 mr-1 shrink-0" />
								)}
								{item.name}
							</li>
						))}
				</ul>
			)}
		</div>
	);
}
