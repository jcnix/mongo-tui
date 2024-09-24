import React, { useState } from 'react';
import { Box, Key, Text } from 'ink';
import { Row } from './row.js';

export const Accordion = (props: {
	isOpen?: boolean;
	header: string;
	children: React.ReactElement;
}) => {
	const [isOpen, setOpen] = useState(props.isOpen);

	const onInput = (input: string, key: Key) => {
		if (key.return) {
			setOpen(!isOpen);
		}

		if (key.leftArrow || input === 'h') {
			setOpen(false);
		}

		if (key.rightArrow || input === 'l') {
			setOpen(true);
		}
	};

	const key = (
		<>
			<Text>{isOpen ? '[-]' : '[+]'}</Text>
			<Text>{props.header}</Text>
		</>
	);

	const value = isOpen ? props.children : null;

	return (
		<Box flexDirection="column">
			<Row keyEl={key} inputCallback={onInput}>
				{value}
			</Row>
		</Box>
	);
};
