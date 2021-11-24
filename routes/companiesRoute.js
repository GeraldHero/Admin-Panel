/* eslint-disable import/extensions */
import express from 'express';
import auth from '../middleware/auth.js';

import {
  createCompanyData,
  getAllCompanies,
  getSpecificCompany,
} from '../controllers/companiesController.js';

const router = express.Router();

router.route('/').get(auth, getAllCompanies).post(auth, createCompanyData);

router.route('/:id').get(auth, getSpecificCompany);

export default router;
// companyRequestCheckerArray,
// validateResult,
