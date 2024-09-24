import React from 'react';
import { Box, Key, Text, useFocus, useFocusManager, useInput } from 'ink';
import figures from 'figures';

export const Row = (props: {
	keyEl: React.ReactElement;
	children: React.ReactElement | null;
	onInput?: (input: string, key: Key) => void;
}) => {
	const { isFocused } = useFocus();
	const { focusNext, focusPrevious } = useFocusManager();

	useInput(
		(input, key) => {
			if (key.downArrow || input === 'j') {
				focusNext();
			}

			if (key.upArrow || input === 'k') {
				focusPrevious();
			}

			if (props.onInput) {
				props.onInput(input, key);
			}
		},
		{
			isActive: isFocused,
		},
	);

	return (
		<>
			<Box flexDirection="row">
				<Text color={'green'}>{isFocused ? `${figures.pointer} ` : ''}</Text>
				{props.keyEl}
			</Box>
			{props.children}
		</>
	);
};
