import mongoose from 'mongoose';
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
    path: String,
    filename: String,

  },
  website: {
    type: String,
  },
});

const Companies = mongoose.model('company', CompaniesSchema);

export default Companies;
