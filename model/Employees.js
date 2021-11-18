import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import platform from 'platform';

const EmployeesSchema = mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require: [true, 'Please enter your first name'],
  },
  lastName: {
    type: String,
    trim: true,
    require: [true, 'Please enter your last name'],
  },
  email: {
    type: String,
    require: [true, 'Please enter your email'],
    trim: true,
    unique: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
  },
  password: {
    type: String,
    require: [true, 'Please enter a password'],
    trim: true,
  },
  phone: {
    type: Number,
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
        require: true,
      },
      usedPlatform: {
        type: String,
        require: true,
      },
    },
  ],
});

// Generate JWT Token and detect platform
EmployeesSchema.methods.generateAuthToken = async function () {
  const employee = this;
  const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET);
  const usedPlatform = platform.description || 'not detected';

  employee.tokens = employee.tokens.concat({ token, usedPlatform });
  await employee.save();
  return token;
};

// Limit/remove sensitive data to the client
EmployeesSchema.methods.toJSON = function () {
  const employee = this;
  const userObject = employee.toObject();
  delete userObject.password;
  delete userObject.isAdmin;
  delete userObject.isVerifiedEmail;
  delete userObject.__v;
  delete userObject.avatar;
  delete userObject.tokens;
  return userObject;
};

const Employees = mongoose.model('employee', EmployeesSchema);

export default Employees;
