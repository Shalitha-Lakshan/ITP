const mongoose = require('mongoose');

async function connectToDatabase(connectionString) {
  if (!connectionString) {
    throw new Error('MONGODB_URI is not set');
  }
  mongoose.set('strictQuery', true);
  await mongoose.connect(connectionString, {
    autoIndex: true
  });
  console.log('Connected to MongoDB');
}

module.exports = { connectToDatabase };