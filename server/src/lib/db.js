import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export async function connectToDatabase() {
	const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecocycle';
	mongoose.set('strictQuery', true);
	try {
		await mongoose.connect(mongoUri, {
			dbName: process.env.MONGODB_DB || 'ecocycle',
		});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.warn('MongoDB connection failed, falling back to in-memory MongoDB:', err?.message);
		const mem = await MongoMemoryServer.create();
		const uri = mem.getUri();
		await mongoose.connect(uri, { dbName: 'ecocycle' });
		console.log('Connected to in-memory MongoDB');
	}
}