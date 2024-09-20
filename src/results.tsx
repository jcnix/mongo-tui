import React from 'react';
import { Box, Text, useFocus } from 'ink';
import { Document, WithId } from 'mongodb';
import { SubResults } from './sub-results.js';

export const Results = (props: { results: WithId<Document>[] }) => {
	const { isFocused } = useFocus();

	return (
		<Box
			flexDirection="column"
			borderStyle="single"
			borderColor={isFocused ? 'green' : undefined}
		>
			<Text>{'Results'}</Text>
			{props.results.map((r) => (
				<SubResults key={r._id.toString()} result={r} />
			))}
		</Box>
	);
};
