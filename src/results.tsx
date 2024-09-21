import React from 'react';
import { Box, Text } from 'ink';
import { Document, WithId } from 'mongodb';
import { SubResults } from './sub-results.js';
import { Accordion } from './accordion.js';

export const Results = (props: { results: WithId<Document>[] }) => {
	return (
		<Box flexDirection="column" borderStyle="single">
			<Text>{'Results'}</Text>
			{props.results.map((r) => (
				<Accordion header={r._id.toString()} key={r._id.toString()}>
					<SubResults result={r} />
				</Accordion>
			))}
		</Box>
	);
};
