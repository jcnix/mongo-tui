import React, { useContext, useState } from 'react';
import { MongoContext } from './mongo-provider.js';
import TextInput from 'ink-text-input';
import { Document, FindCursor, WithId } from 'mongodb';
import vm from 'node:vm';
import { useFocus } from 'ink';

export const CommandInput = (props: {
	setResults: (results: WithId<Document>[]) => void;
}) => {
	const db = useContext(MongoContext);
	const [command, setCommand] = useState("db.collection('test').find({a:1})");
	const { isFocused } = useFocus();

	const onSubmit = async () => {
		const context = vm.createContext({
			db,
		});
		const cursor: FindCursor<WithId<Document>> = vm.runInContext(
			command,
			context,
		);

		const results = await cursor?.toArray();

		props.setResults(results);
	};

	return (
		<TextInput
			focus={isFocused}
			value={command}
			onChange={setCommand}
			onSubmit={onSubmit}
		/>
	);
};
