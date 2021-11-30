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

import { checkPermission } from '../middleware/permissionMiddleware.js';

const router = express.Router();
router
  .route('/')
  .get(auth, getAllUserData)
  .post(registerRequestCheckerArray, validateResult, createEmployee);

router
  .route('/:id')
  .get(auth, getSpecificUser)
  .patch(
    auth,
    registerRequestCheckerArray,
    validateResult,
    checkPermission,
    editEmployee
  )
  .delete(auth, checkPermission, deleteUser);

export default router;
