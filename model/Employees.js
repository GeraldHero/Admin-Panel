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
  Company: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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

const Employees = mongoose.model('employee', EmployeesSchema);

export default Employees;
