import mongoose from 'mongoose';
import validator from 'validator';
const CompaniesSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  logo: {
    type: Buffer,
  },
  website: {
    type: String,
  },
  Employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'employee' }],
});

const Companies = mongoose.model('company', CompaniesSchema);

export default Companies;
