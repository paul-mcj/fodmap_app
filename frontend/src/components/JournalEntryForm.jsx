import { useState } from "react";
import { privatePostUserJournalEntry } from "../utils/api_req";

const JournalEntryForm = ({ onNewJournalEntry }) => {
	const [entry, setEntry] = useState("");

	const handleCreateEntry = async (e) => {
		e.preventDefault();

		try {
			await privatePostUserJournalEntry(entry);
			console.log("new journal entry successful!!");
			setEntry(""); // reset state
			onNewJournalEntry(); // refresh parent component
		} catch (err) {
			console.error(
				"ERROR posting:",
				err?.response?.data || err.message
			);
		}
	};

	return (
		<>
			<p>Add a new journal entry:</p>
			<form onSubmit={handleCreateEntry}>
				<input
					value={entry}
					onChange={(e) => setEntry(e.target.value)}
					placeholder="Tell me about your recent food experience..."
				/>
				<button type="submit">Add Entry</button>
			</form>
		</>
	);
};

export default JournalEntryForm;
