import React from 'react';
import SelectInput from 'ink-select-input';
import fs from 'node:fs';
import { confSlice } from './state/conf-slice.js';
import { DbConfig } from './state/db-config.js';
import { useAppDispatch, useAppSelector } from './app/hooks.js';

type ConfigType = Record<string, DbConfig>;

export const ServerSelector = () => {
	const file = fs.readFileSync('./mongo-config.json', 'utf8');
	const config: ConfigType = JSON.parse(file);
	const dispatch = useAppDispatch();
	const stateConfig = useAppSelector((state) => state.config);

	const servers = Object.keys(config);
	const items = servers.map((server) => {
		return {
			label: server,
			value: server,
		};
	});

	const handleSelect = (item: { label: string; value: string }) => {
		const c = config[item.value] || {
			username: '',
			password: '',
			host: '',
			port: '',
			db: '',
			options: {},
		};

		dispatch(confSlice.actions.setConfig(c));
	};

	return !stateConfig.host ? (
		<SelectInput items={items} onSelect={handleSelect} />
	) : null;
};
