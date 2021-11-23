import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import {
  validateResult,
  companyRequestCheckerArray,
} from '../middleware/expressVMiddleware.js';
import auth from '../middleware/auth.js';

import {
  createCompanyData,
  getAllCompanies,
  getSpecificCompany,
} from '../controllers/companiesController.js';

const router = express.Router();

const upload = multer({
  dest: 'client/public/logo',
  limits: {
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image'));
    }

    cb(undefined, true);
  },
});

router.route('/').get(auth, getAllCompanies).post(
  auth,

  upload.single('Logo'),
  createCompanyData
);

router.route('/:id').get(auth, getSpecificCompany);

export default router;
// companyRequestCheckerArray,
// validateResult,
