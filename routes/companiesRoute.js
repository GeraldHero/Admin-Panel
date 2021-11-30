/* eslint-disable import/extensions */
import express from 'express';
import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multerMiddleware.js';
import { checkPermission } from '../middleware/permissionMiddleware.js';
import {
  createCompanyData,
  deleteCompany,
  getAllCompanies,
  getSpecificCompany,
} from '../controllers/companiesController.js';
import {
  companyRequestCheckerArray,
  validateResult,
} from '../middleware/expressVMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(auth, getAllCompanies)
  .post(
    auth,
    checkPermission,
    multerMiddleware,
    companyRequestCheckerArray,
    validateResult,
    createCompanyData
  );

router
  .route('/:id')
  .get(auth, checkPermission, getSpecificCompany)
  .delete(auth, checkPermission, deleteCompany);

export default router;
// companyRequestCheckerArray,
// validateResult,
