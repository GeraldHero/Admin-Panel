/* eslint-disable import/extensions */
import express from 'express';
import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multerMiddleware.js';
import {
  createCompanyData,
  deleteCompany,
  getAllCompanies,
  getSpecificCompany,
} from '../controllers/companiesController.js';

const router = express.Router();

router
  .route('/')
  .get(auth, getAllCompanies)
  .post(auth, multerMiddleware, createCompanyData);

router.route('/:id').get(auth, getSpecificCompany).delete(auth, deleteCompany);

export default router;
// companyRequestCheckerArray,
// validateResult,
