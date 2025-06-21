import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flexibble';

export async function connectMongoose() {
  if (mongoose.connections[0].readyState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 20000, // 20 seconds
      socketTimeoutMS: 45000, // 45 seconds
      maxPoolSize: 10,
      minPoolSize: 5,
      family: 4 // Use IPv4, skip trying IPv6
    });
    console.log('✅ Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
}