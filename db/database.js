import mongoose from 'mongoose';

const connectDB = async () => {
  const collectionName = 'AdminPanel';

  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}${collectionName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      `MongoDB connected to host ${conn.connection.host}`.magenta.bold
    );
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
export default connectDB;
