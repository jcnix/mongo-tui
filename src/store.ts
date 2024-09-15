import { configureStore } from '@reduxjs/toolkit';
import { confSlice } from './state/conf-slice.js';

const store = configureStore({
	reducer: {
		config: confSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
