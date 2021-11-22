import express from 'express';
import bcryptjs from 'bcryptjs';
import Employees from '../model/Employees.js';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
const router = express.Router();

// @route   POST /api/auth
// @desc    Auth/Login user and get token
// @access  Public

router.post(
  '/',
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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors });
    }
    const { email, password } = req.body;
    try {
      // find Employee
      const employee = await Employees.findOne({ email });
      if (employee === null)
        return res.status(400).json({ msg: 'Invalid Credential' });

      const isMatch = await bcryptjs.compareSync(password, employee.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid Credential' });

      const token = await employee.generateAuthToken();
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ msg: 'Server error!' });
    }
  }
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
