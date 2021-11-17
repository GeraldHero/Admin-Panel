import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import Employee from '../../model/Employees';
import jwt from 'jsonwebtoken';
const dummyTestId = new mongoose.Types.ObjectId();
const salt = bcryptjs.genSaltSync(10);

export const dummyTest1 = {
  _id: dummyTestId,
  firstName: 'gerald',
  lastName: 'hug',
  email: 'gerald_hug92@gmail.com',
  position: 'Admin',
  password: bcryptjs.hashSync('12345678', salt),
  tokens: [
    {
      token: jwt.sign({ _id: dummyTestId }, process.env.JWT_SECRET),
    },
  ],
};

export const dummyTest2 = {
  _id: dummyTestId,
  firstName: 'rion',
  lastName: 'hug',
  email: 'rion92@gmail.com',
  position: 'Reviewer',
  password: bcryptjs.hashSync('12345678', salt),
  tokens: [
    {
      token: jwt.sign({ _id: dummyTestId }, process.env.JWT_SECRET),
    },
  ],
};

export const setupDB = async () => {
  await Employee.deleteMany();
  await new Employee(dummyTest1).save();
  await new Employee(dummyTest2).save();
  // await HorizonUpdates.deleteMany();
  // await new HorizonUpdates(dummyTestHUpdate).save();
};

// export { dummyTest1, dummyTest2, setupDB };
