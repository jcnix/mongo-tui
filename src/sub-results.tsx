import React from 'react';
import { Newline, Text } from 'ink';
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
		<Text>
			<>
				{Object.entries(props.result).map(([k, v]) => (
					<Text key={k}>
						<Text>{k}: </Text>
						{toDisplay(v)}
						<Newline />
					</Text>
				))}
			</>
		</Text>
	);
};
