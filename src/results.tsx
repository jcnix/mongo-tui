import React from 'react';
import { Box, Newline, Text } from 'ink';
import { Document, WithId } from 'mongodb';
import { SubResults } from './sub-results.js';

export const Results = (props: { results: WithId<Document>[] }) => {
	return (
		<Box>
			<Text>
				{'Results'}
				<Newline />
				{props.results.map((r) => (
					<SubResults key={r._id.toString()} result={r} />
				))}
			</Text>
		</Box>
	);
};
