import mongoose from 'mongoose';
import { DATABASE_NAME, DATABASE_URL } from '../utils/constant';

export async function connectDB() {
	if (mongoose.connections[0].readyState) return;

	try {
	  await mongoose.connect(DATABASE_URL, { dbName: DATABASE_NAME });
	  console.log('Connected to MongoDB');
	} catch (error) {
	  console.error('MongoDB connection error:', error);
	}
  }