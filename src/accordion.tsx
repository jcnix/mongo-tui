import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import { ReactElement } from 'react';

export const Accordion = (props: {
	isOpen?: boolean;
	header: string;
	children: ReactElement;
}) => {
	const [isOpen, setOpen] = useState(props.isOpen);

	useInput((_, key) => {
		if (key.return) {
			setOpen(!isOpen);
		}
	});

	return (
		<Box>
			<Text>{props.header}</Text>
			{isOpen ? props.children : null}
		</Box>
	);
};
