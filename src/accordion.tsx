import React, { useState } from 'react';
import { Box, Text, useFocus, useInput } from 'ink';
import { ReactElement } from 'react';

export const Accordion = (props: {
	isOpen?: boolean;
	header: string;
	children: ReactElement;
}) => {
	const [isOpen, setOpen] = useState(props.isOpen);
	const { isFocused } = useFocus();

	useInput((_, key) => {
		if (isFocused && key.return) {
			setOpen(!isOpen);
		}
	});

	return (
		<Box>
			<Text>{isFocused ? '> ' : ''}</Text>
			<Text>{isOpen ? '[-]' : '[+]'}</Text>
			<Text>{props.header}</Text>
			{isOpen ? props.children : null}
		</Box>
	);
};
