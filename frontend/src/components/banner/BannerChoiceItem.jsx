import { Check } from "lucide-react";
import { forwardRef, useState } from "react";

const BannerChoiceItem = forwardRef(
	(
		{
			selection,
			setBannerSelection,
			imgSrc,
			color,
			transformOrigin,
			name
		},
		ref
	) => {
		const [hovered, setHovered] = useState(false);

		const handleClick = () => {
			if (color) setBannerSelection(color);
			if (imgSrc) setBannerSelection(imgSrc);
		};

		return (
			<div
				ref={ref}
				onClick={handleClick}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				style={{ transformOrigin }}
				className={`relative grid place-items-center h-10 w-14 cursor-pointer rounded-lg  transform transition-transform duration-300 ease-in-out hover:scale-200 hover:z-10 hover:shadow-md/50 overflow-hidden ${
					color ? color : ""
				}`}>
				{imgSrc && (
					<div className="opacity-100 bg-white">
						<img
							src={imgSrc}
							alt={name}
							className={`h-10 w-14 rounded-lg ${
								selection === imgSrc ? "opacity-30" : ""
							}`}
						/>
					</div>
				)}

				{/* Checkmark if selected */}
				{selection === (imgSrc || color) && (
					<Check className="absolute size-6 shrink-0 text-black" />
				)}

				{/* Show name on hover */}
				{hovered && name && (
					<div className="hidden md:block absolute bottom-0.5 text-black px-1 bg-white rounded text-[6px] py-0">
						{name}
					</div>
				)}
			</div>
		);
	}
);

export default BannerChoiceItem;
