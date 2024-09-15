import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DbConfig } from './db-config.js';

export const confSlice = createSlice({
	name: 'config',
	initialState: {} as DbConfig,
	reducers: {
		setConfig: (_, action: PayloadAction<DbConfig>) => action.payload,
	},
});
