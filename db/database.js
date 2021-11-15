import mongoose from 'mongoose';

const connectDB = async () => {
  const collectionName = 'AdminPanel';
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}${collectionName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};
export default connectDB;
