import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Companies from '../../model/Companies';
import Employees from '../../model/Employees';

const dummyTest1Id = new mongoose.Types.ObjectId();
export const dummyTest1 = {
  _id: dummyTest1Id,
  firstName: 'gerald',
  lastName: 'hug',
  email: 'gh@gmail.com',
  phone: parseInt('0941424123'),
  isAdmin: true,
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
  isAdmin: false,
  tokens: [
    {
      token: jwt.sign({ id: "SampleId" }, process.env.JWT_SECRET),
    },
  ],
};

export const companyDummy1 = {
  _id: dummyTest1Id,
  name: 'gerald inc',
  logo: {
    path: '/logo/image/123.jpg',
    filename: '123.jpg',
  },
  website: 'gerald.com',
};

export const setupDB = async () => {
  await Employees.deleteMany();
  await Companies.deleteMany();
  await new Employees(dummyTest1).save();
  await new Employees(dummyTest2).save();
  await new Companies(companyDummy1).save();
};
