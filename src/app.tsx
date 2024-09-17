import React, { useContext, useState } from 'react';
import { MongoContext } from './mongo-provider.js';
import TextInput from 'ink-text-input';
import { Document, FindCursor, WithId } from 'mongodb';
import vm from 'node:vm';
import { Results } from './results.js';

export default function App() {
	const db = useContext(MongoContext);
	const [command, setCommand] = useState("db.collection('test').find({a:1})");
	const [result, setResult] = useState<WithId<Document>[] | undefined>([]);

	const onSubmit = async () => {
		const context = vm.createContext({
			db,
		});
		const cursor: FindCursor<WithId<Document>> = vm.runInContext(
			command,
			context,
		);

		const results = await cursor?.toArray();

		setResult(results);
	};

	return db ? (
		<>
			<TextInput value={command} onChange={setCommand} onSubmit={onSubmit} />
			{result ? <Results results={result} /> : null}
		</>
	) : null;
}
