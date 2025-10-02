export function formatPostDate(dateString) {
	const now = new Date();
	const postDate = new Date(dateString);
	const diffInSeconds = Math.floor((now - postDate) / 1000);

	if (isNaN(diffInSeconds)) return "Invalid date";

	// Under 1 minute
	if (diffInSeconds < 60) return "just now";

	const minutes = Math.floor(diffInSeconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);

	if (minutes < 60)
		return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
	if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
	if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
	if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} ago`;
	if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;

	// If over a year, return full readable date like June 4, 2025
	return postDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}
