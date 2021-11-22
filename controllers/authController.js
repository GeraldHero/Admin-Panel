import bcryptjs from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import Employees from '../model/Employees.js';
import auth from '../middleware/auth.js';

// @route   POST /api/auth
// @desc    Auth/Login user and get token
// @access  Public

export const loginUser = auth, async (req, res) => {

}