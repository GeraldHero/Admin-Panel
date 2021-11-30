/* eslint-disable import/extensions */

import express from 'express';
import auth from '../middleware/auth.js';
import {
  registerRequestCheckerArray,
  validateResult,
} from '../middleware/expressVMiddleware.js';
import {
  createEmployee,
  deleteUser,
  editEmployee,
  getAllUserData,
  getSpecificUser,
} from '../controllers/employeesController.js';

const router = express.Router();
router
  .route('/')
  .get(auth, getAllUserData)
  .post(registerRequestCheckerArray, validateResult, createEmployee);

router
  .route('/:id')
  .get(auth, getSpecificUser)
  .patch(auth, registerRequestCheckerArray, validateResult, editEmployee)
  .delete(auth, deleteUser);

export default router;
