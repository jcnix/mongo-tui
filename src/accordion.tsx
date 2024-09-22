import React, { useState } from 'react';
import { Box, Text, useFocus, useFocusManager, useInput } from 'ink';
import { ReactElement } from 'react';

export const Accordion = (props: {
	isOpen?: boolean;
	header: string;
	children: ReactElement;
}) => {
	const [isOpen, setOpen] = useState(props.isOpen);
	const { isFocused } = useFocus();
	const { focusNext, focusPrevious } = useFocusManager();

	useInput(
		(input, key) => {
			if (key.return) {
				setOpen(!isOpen);
			}

			if (key.leftArrow || input === 'h') {
				setOpen(false);
			}

			if (key.rightArrow || input === 'l') {
				setOpen(true);
			}

			if (key.downArrow || input === 'j') {
				focusNext();
			}

			if (key.upArrow || input === 'k') {
				focusPrevious();
			}
		},
		{
			isActive: isFocused,
		},
	);

	return (
		<Box flexDirection="column">
			<Box flexDirection="row">
				<Text>{isFocused ? '> ' : ''}</Text>
				<Text>{isOpen ? '[-]' : '[+]'}</Text>
				<Text>{props.header}</Text>
			</Box>
			{isOpen ? props.children : null}
		</Box>
	);
};
