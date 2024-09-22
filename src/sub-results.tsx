import React from 'react';
import { Box, Text } from 'ink';
import { ObjectId } from 'mongodb';
import { Accordion } from './accordion.js';
import figures from 'figures';

const toDisplay = (k: string, v: any) => {
	if (v instanceof ObjectId) {
		return (
			<Box paddingLeft={2}>
				<Text>{`${figures.lineUpRight} ${k}: `}</Text>
				<Text>{v.toString()}</Text>
			</Box>
		);
	} else if (typeof v !== 'object') {
		return (
			<Box paddingLeft={2}>
				<Text>{`${figures.lineUpRight} ${k}: `}</Text>
				<Text>{v}</Text>
			</Box>
		);
	} else {
		return (
			<Box paddingLeft={2}>
				<Accordion header={k}>
					<>
						<SubResults result={v} />
					</>
				</Accordion>
			</Box>
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
