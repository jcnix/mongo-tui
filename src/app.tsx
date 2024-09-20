import React, { useContext, useState } from 'react';
import { MongoContext } from './mongo-provider.js';
import { Document, WithId } from 'mongodb';
import { Results } from './results.js';
import { CommandInput } from './command-input.js';

export default function App() {
	const db = useContext(MongoContext);
	const [result, setResult] = useState<WithId<Document>[] | undefined>([]);

	return db ? (
		<>
			<CommandInput setResults={setResult} />
			{result ? <Results results={result} /> : null}
		</>
	) : null;
}
