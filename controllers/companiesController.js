/* eslint-disable import/extensions */
import Companies from '../model/Companies.js';

// @route   GET api/companies
// @desc    Get All Companies Data
// @access  Private

export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Companies.find();
    return res.status(200).send(companies);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   GET api/companies/:id
// @desc    Get Specific company Data
// @access  Private

export const getSpecificCompany = async (req, res) => {
  try {
    const companies = await Companies.findOne({ _id: req.params.id });
    if (!companies) return res.status(404).send({ msg: 'User not found' });
    return res.status(200).send(companies);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route POST /api/companies
// @desc  Create company data
// @access Private

export const createCompanyData = async (req, res) => {
  const { name, logo, email, website } = req.body;

  try {
    let company = await Companies.findOne({ name });
    if (company) {
      res.status(401).json({ msg: 'Company name is already registered!' });
    }

    company = new Companies({
      name,
      logo,
      email,
      website,
    });
    await company.save();
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
