import React, { useEffect, useState } from 'react';
import { Db, MongoClient } from 'mongodb';
import { useAppSelector } from './app/hooks.js';

export const MongoContext = React.createContext<Db | null>(null);

export const MongoProvider = (props: { children: JSX.Element }) => {
	const config = useAppSelector((state) => state.config);

	const [database, setDatabase] = useState<Db | null>(null);

	useEffect(() => {
		const connect = async () => {
			if (!config.host) {
				return;
			}

			const connectionString = `mongodb://${config.username}:${encodeURIComponent(config.password)}@${config.host}:${config.port}`;
			const client = await MongoClient.connect(
				connectionString,
				config.options,
			);

			const db = client.db(config.db);

			setDatabase(db);
		};

		connect();
	}, [config]);

	return (
		<MongoContext.Provider value={database}>
			{props.children}
		</MongoContext.Provider>
	);
};
