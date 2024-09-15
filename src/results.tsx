import React from 'react';
import { Box, Text } from 'ink';
import { Document, WithId } from 'mongodb';

export const Results = (props: { results?: WithId<Document>[] }) => {
	return (
		<Box>
			<>
				<Text>{'Results'}</Text>
				{props.results?.map((result) => (
					<Text key={result._id.toString()}>{JSON.stringify(result)}</Text>
				))}
			</>
		</Box>
	);
};
