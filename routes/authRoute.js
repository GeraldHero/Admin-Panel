import express from 'express';
import bcryptjs from 'bcryptjs';
import Employees from '../model/Employees.js';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
const router = express.Router();
import validateRequestSchema from '../middleware/expressVMiddleware.js';
import { loginUser } from '../controllers/authController.js';

router
  .route('/')
  .post(
    [
      check('email')
        .isEmail()
        .withMessage('Input Email is required!')
        .normalizeEmail(),
      check('password')
        .notEmpty()
        .withMessage('Please insert a password!')
        .isLength({ min: 5 })
        .withMessage('Password must be 5 character or more!')
        .trim()
        .escape(),
    ],
    validateRequestSchema,
    loginUser
  );

// @route   POST /api/auth/logout
// @desc    Logout User
// @access  Private

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    // console.log(req.user.tokens)
    await req.user.save();

    return res.send('Logout succesfully!');
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout all device session
// @access  Private

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    return res.send('All device succesfully logout!');
  } catch (error) {
    return res.status(500).send({ msg: error });
  }
});

export default router;
