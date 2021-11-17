import mongoose, { mongo } from 'mongoose';
import bcryptjs from 'bcryptjs';
import Employee from '../../model/Employees';

const dummyTestId = new mongoose.Types.ObjectId();
const salt = await bcryptjs.genSaltSync(10);

export const dummyTest1 = {
  _id: dummyTestId,
  firstName: 'gerald',
  lastName: 'hug',
  email: 'gerald_hug92@gmail.com',
  position: 'Admin',
  password: await bcryptjs.hashSync('12345678', salt),
  token: [
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
  password: await bcryptjs.hashSync('12345678', salt),
};

export const setupDB = async () => {
  await User.deleteMany();
  await new User(dummyTest1).save();
  await new User(dummyTest2).save();
  // await HorizonUpdates.deleteMany();
  // await new HorizonUpdates(dummyTestHUpdate).save();
};

// export { dummyTest1, dummyTest2, setupDB };
