import express from 'express';
import { check } from 'express-validator';
import auth from '../middleware/auth.js';
import {
  loginRequestCheckerArray,
  validateResult,
} from '../middleware/expressVMiddleware.js';
import {
  loginUser,
  logoutUser,
  logoutAllUser,
} from '../controllers/authController.js';
const router = express.Router();
router.route('/').post(loginRequestCheckerArray, validateResult, loginUser);
router.route('/logout').post(auth, logoutUser);
router.route('/logoutAll').post(auth, logoutAllUser);

export default router;
