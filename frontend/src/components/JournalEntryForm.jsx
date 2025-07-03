import { useState } from "react";
import { postNewJournalEntry } from "../utils/api_req";

const JournalEntryForm = () => {
	const [entry, setEntry] = useState("");

	const handleCreateEntry = async (e) => {
		e.preventDefault();

		try {
			// await postNewJournalEntry({ entry });
			await postNewJournalEntry(entry);
			console.log("new journal entry successful!!");
		} catch (err) {
			console.log("ERROR posting");
			console.log(err);
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
