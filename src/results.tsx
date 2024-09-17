import React from 'react';
import { Box, Text } from 'ink';
import { Document, WithId } from 'mongodb';
import { SubResults } from './sub-results.js';

export const Results = (props: { results: WithId<Document>[] }) => {
	return (
		<Box flexDirection="column">
			<Text>{'Results'}</Text>
			{props.results.map((r) => (
				<SubResults key={r._id.toString()} result={r} />
			))}
		</Box>
	);
};
