const mongoose = require('mongoose');

let memoryServer = null;

async function connectToDatabase(connectionString) {
  if (!connectionString) {
    connectionString = process.env.MONGODB_URI;
  }
  if (!connectionString && process.env.USE_IN_MEMORY_DB !== 'true') {
    throw new Error('MONGODB_URI is not set');
  }

  mongoose.set('strictQuery', true);
  try {
    if (connectionString) {
      await mongoose.connect(connectionString, { autoIndex: true });
      console.log('Connected to MongoDB');
      return;
    }
    throw new Error('No connection string provided');
  } catch (primaryError) {
    if (process.env.USE_IN_MEMORY_DB === 'true') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const uri = memoryServer.getUri();
      await mongoose.connect(uri, { autoIndex: true });
      console.log('Connected to in-memory MongoDB');
      return;
    }
    throw primaryError;
  }
}

module.exports = { connectToDatabase };