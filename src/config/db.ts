import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGO_URI ||
        'mongodb+srv://nidhikanwar45_db_user:Nidhi_12345@cluster0.3kryhbu.mongodb.net/mydatabase?appName=Cluster0'
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};
