import { MongoClient } from 'mongodb';

const main = async () => {
	const connectionString = 'mongodb://root:password@localhost:27017';

	const client = await MongoClient.connect(connectionString);
	const db = client.db('test');

	// console.log(client);

	db.createCollection('test');

	await db.collection('test').insertOne({
		a: 1,
	});
	await db.collection('test').insertOne({
		b: 2,
		c: 'test',
		d: {
			e: 3,
			f: 'foo',
		},
	});

	const cursor = db.collection('test').find({ a: 1 });
	const results = await cursor.toArray();
	console.log(results);

	await client.close();

	return;
};

main();
