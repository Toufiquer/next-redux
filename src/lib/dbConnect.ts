import mongoose from 'mongoose';

const connection: {isConnected?: number} = {};

async function dbConnect() {
  try {
    console.log(' connecting db hit');
    let db;
    if (connection.isConnected) {
      return;
    }
    db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState;

    console.log('Connect status : ', db.connections[0].readyState);
  } catch (e) {
    console.log('error connecting : ', e);
  }
}

export default dbConnect;
