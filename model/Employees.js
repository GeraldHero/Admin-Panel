import mongoose from 'mongoose';

const EmployeesSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'company',
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  phone: {
    type: Number,
  },
  adminAuthorize: {
    type: Boolean,
    default: false,
  },
  isVerifiedEmail: {
    type: Boolean,
    default: false,
  },
});

EmployeesSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.adminAuthorize;
  delete userObject.isVerifiedEmail;
  delete userObject.__v;
  delete userObject.avatar;

  return userObject;
};

const Employees = mongoose.model('employee', EmployeesSchema);

export default Employees;
