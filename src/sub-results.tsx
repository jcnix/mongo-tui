import React from 'react';
import { Box, Text } from 'ink';
import { ObjectId } from 'mongodb';
import { Accordion } from './accordion.js';

const toDisplay = (k: string, v: any) => {
	if (v instanceof ObjectId) {
		return (
			<>
				<Text>{k}: </Text>
				<Text>{v.toString()}</Text>
			</>
		);
	} else if (typeof v !== 'object') {
		return (
			<>
				<Text>{k}: </Text>
				<Text>{v}</Text>
			</>
		);
	} else {
		return (
			<Accordion header={k}>
				<>
					<SubResults result={v} />
				</>
			</Accordion>
		);
	}
};

export const SubResults = (props: { result: object }) => {
	return (
		<Box flexDirection="column">
			{Object.entries(props.result).map(([k, v]) => (
				<Box key={k} flexDirection="row">
					{toDisplay(k, v)}
				</Box>
			))}
		</Box>
	);
};
