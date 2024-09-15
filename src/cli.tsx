#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';
import { MongoProvider } from './mongo-provider.js';
import { ServerSelector } from './server-selector.js';
import { Provider } from 'react-redux';
import store from './store.js';

render(
	<Provider store={store}>
		<ServerSelector />
		<MongoProvider>
			<App />
		</MongoProvider>
	</Provider>,
);
