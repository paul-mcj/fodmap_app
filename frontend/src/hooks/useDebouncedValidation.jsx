// import { useEffect, useState } from "react";

// export function useDebouncedValidation(value, validateFn, delay = 500) {
// 	const [status, setStatus] = useState("idle"); // "idle" | "checking" | "available" | "taken" | "error"

// 	useEffect(() => {
// 		if (!value) {
// 			setStatus("idle");
// 			return;
// 		}

// 		setStatus("checking");

// 		const handler = setTimeout(async () => {
// 			try {
// 				const res = await validateFn(value);
// 				setStatus(res.data.available ? "available" : "taken");
// 			} catch (err) {
// 				console.error("Validation error:", err);
// 				setStatus("error");
// 			}
// 		}, delay);

// 		return () => clearTimeout(handler);
// 	}, [value, validateFn, delay]);

// 	return status;
// }

import { useEffect, useState } from "react";

export function useDebouncedValidation(
	value,
	validateFn,
	delay = 500,
	enabled = true
) {
	const [status, setStatus] = useState(null); // null | "checking" | "available" | "taken" | "error"

	useEffect(() => {
		if (!value || !enabled) {
			setStatus(null);
			return;
		}

		setStatus("checking");
		const handler = setTimeout(async () => {
			try {
				const res = await validateFn(value);
				setStatus(res.data.available ? "available" : "taken");
			} catch (err) {
				console.error("Validation error:", err);
				setStatus("error");
			}
		}, delay);

		return () => clearTimeout(handler);
	}, [value, validateFn, delay, enabled]);

	return { isValid: status === "available", status };
}
