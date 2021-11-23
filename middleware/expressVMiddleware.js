import { check, validationResult } from 'express-validator';

const registerRequestCheckerArray = [
  //check firstname
  check('firstName', 'Firstname is required').not().isEmpty().trim().escape(),
  // check lname
  check('lastName', 'Last Name is required').not().isEmpty().trim().escape(),
  // username must be an email
  check('email', 'Please insert a valid email address')
    .isEmail()
    .notEmpty()
    .normalizeEmail(),
  // password must be at least 8 chars long
  check('password')
    .trim()
    .escape()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .notEmpty(),
  check('phone', 'Please insert a number').isNumeric(),
];

const loginRequestCheckerArray = [
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
];

const companyRequestCheckerArray = [
  check('name', 'Please insert your company name!')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('email', 'Please insert a valid email address')
    .isEmail()
    .notEmpty()
    .normalizeEmail(),
  check('logo'),
  check('website'),
];

function validateResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors });
  }
  next();
}

export {
  loginRequestCheckerArray,
  registerRequestCheckerArray,
  companyRequestCheckerArray,
  validateResult,
};
