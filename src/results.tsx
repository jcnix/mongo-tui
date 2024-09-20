import React from 'react';
import { Box, Text, useFocus } from 'ink';
import { Document, WithId } from 'mongodb';
import { SubResults } from './sub-results.js';
import { Accordion } from './accordion.js';

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
				<Accordion header={r._id.toString()} key={r._id.toString()}>
					<SubResults result={r} />
				</Accordion>
			))}
		</Box>
	);
};
