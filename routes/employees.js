import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Employees from '../model/Employees.js';
import { check, param, validationResult } from 'express-validator';
const router = express.Router();

// @route   GET api/users/
// @desc    Get All User Data
// @access  Public

router.get('/', async (req, res) => {
  try {
    const Employee = await Employees.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong :(' });
  }
});

// @route POST /api/users
// @desc  Create User
// @access Private

router.post(
  '/',
  [
    //check firstname
    check('firstName', 'Firstname is required').not().isEmpty().trim().escape(),
    // check lname
    check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
    // username must be an email
    check('email', 'Please insert a valid email address')
      .isEmail()
      .notEmpty()
      .normalizeEmail(),
    // password must be at least 5 chars long
    check('password')
      .trim()
      .escape()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/\d/)
      .withMessage('Password must contain a number')
      .notEmpty(),
    check('phone', 'Please insert a number').isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors });
    }
    const { firstName, lastName, email, phone, password } = req.body;
    try {
      let user = await Employees.findOne({ email });
      if (user) {
        console.log('running');
        return res.status(401).json({ msg: 'Account is already registered!' });
      }
      user = new Employees({
        firstName,
        lastName,
        email,
        phone,
        password,
      });

      const salt = await bcryptjs.genSaltSync(10);
      user.password = await bcryptjs.hashSync(password, salt);

      await user.save();
      console.log(user);
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token, user });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error });
    }
  }
);

export default router;
