/* eslint-disable import/extensions */
import fs from 'fs';
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

const deleteFile = (path) => {
  fs.unlink(path, function () {
    console.log('File deleted!');
  });
};

// @route POST /api/companies
// @desc  Create company data
// @access Private

export const createCompanyData = async (req, res) => {
  const { name, email, website } = req.body;

  if (!req.file) req.file = { path: 'none', filename: 'none' };
  const { path, filename } = req.file;
  // remove .jpg - filename.replace(/\.[^/.]+$/, '')
  try {
    let company = await Companies.findOne({ name });

    if (company) {
      // delete upload image
      if (req.file.path !== 'none' || req.file.filename !== 'none')
        deleteFile(path);
      return res
        .status(401)
        .json({ msg: 'Company name is already registered!' });
    }

    company = new Companies({
      name,
      logo: { path, filename },
      email,
      website,
    });
    await company.save();

    return res.status(201).send({ company });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error');
  }
};

// @route PUT /api/companies/:id
// @desc  update company
// @access Private

// const updateCompany = async (req, res) => {
//   try {
//     const company = await Companies.findById(req.params.id)

//   } catch (error) {
//   }
// }

// @route DELETE /api/companies/:id
// @desc  Delete company
// @access Private

export const deleteCompany = async (req, res) => {
  try {
    const company = await Companies.findByIdAndDelete(req.params.id);

    if (!company) return res.status(404).send({ msg: 'Company not found!' });
    if (company.logo) {
      const { path } = company.logo;
      // delete upload image
      deleteFile(path);
    }

    return res.status(200).send({ msg: 'Deleted Successfully!' });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server Error!');
  }
};
