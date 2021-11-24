import mongoose from 'mongoose';
import Employee from '../../model/Employees';
import jwt from 'jsonwebtoken';

const dummyTest1Id = new mongoose.Types.ObjectId();
export const dummyTest1 = {
  _id: dummyTest1Id,
  firstName: 'gerald',
  lastName: 'hug',
  email: 'gh@gmail.com',
  phone: parseInt('0941424123'),
  position: 'Admin',
  password: '123456gh',
  tokens: [
    {
      token: jwt.sign({ id: dummyTest1Id }, process.env.JWT_SECRET),
    },
  ],
};

export const dummyTest2 = {
  firstName: 'rion',
  lastName: 'hug',
  phone: parseInt('0941424123'),
  email: 'rh@gmail.com',
  position: 'Reviewer',
  password: '123456gh',
};

export const setupDB = async () => {
  await Employee.deleteMany();
  await new Employee(dummyTest1).save();
  await new Employee(dummyTest2).save();
  // await HorizonUpdates.deleteMany();
  // await new HorizonUpdates(dummyTestHUpdate).save();
};

// export { dummyTest1, dummyTest2, setupDB };
