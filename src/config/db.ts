import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydatabase');
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};
