import mongoose from 'mongoose';

const connection = {
  isConnected: false, // Initialize the connection state
};

async function dbConnect() {
  // Check if we have a connection to the database or if it's currently connecting
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Attempt to connect to the database
    const db = await mongoose.connect(process.env.MONGODB_URI || ' ');

    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Throw the error to be handled upstream
  }
}

export default dbConnect; // Use ES6 export syntax