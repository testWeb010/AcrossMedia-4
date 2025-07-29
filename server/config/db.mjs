import mongoose from 'mongoose';

let dbConnection = null;

export const getDb = async () => {
  if (dbConnection) {
    return dbConnection;
  }

  try {
    // Use the existing mongoose connection
    if (mongoose.connection.readyState === 1) {
      console.log('Using existing MongoDB connection');
      dbConnection = mongoose.connection;
      return dbConnection;
    } else {
      throw new Error('No active MongoDB connection available. Application must establish connection before logging security events.');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
};

export default getDb;
