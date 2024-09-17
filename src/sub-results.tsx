import React from 'react';
import { Box, Text } from 'ink';
import { ObjectId } from 'mongodb';

const toDisplay = (v: any) => {
	if (v instanceof ObjectId) {
		return <Text>{v.toString()}</Text>;
	} else if (typeof v !== 'object') {
		return <Text>{v}</Text>;
	} else {
		return <SubResults result={v} />;
	}
};
export const SubResults = (props: { result: object }) => {
	return (
		<Box flexDirection="column">
			{Object.entries(props.result).map(([k, v]) => (
				<Box key={k} flexDirection="row">
					<Text>{k}: </Text>
					{toDisplay(v)}
				</Box>
			))}
		</Box>
	);
};
