import express from 'express';
import bcryptjs from 'bcryptjs';
import Employees from '../model/Employees.js';
import auth from '../middleware/auth.js'
import { check, validationResult } from 'express-validator';
const router = express.Router();

// @route   GET api/employees/
// @desc    Get All User Data
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const Employee = await Employees.find();
    return res.status(200).send(Employee);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
});

// @route   GET api/employees/:id
// @desc    Get Specific User Data
// @access  Private

router.get('/:id', auth, async (req, res) => {
  try {
 
    const employee = await Employees.findOne({_id: req.params.id});
   if(!employee) return res.status(404).send({msg: "User not found"})
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong :(' });
  }
});

// @route POST /api/employees
// @desc  Create Employee
// @access Private

router.post(
  '/',
  [
    //check firstname
    check('firstName', 'First name is required').not().isEmpty().trim().escape(),
    // check lname
    check('lastName', 'Last name is required').not().isEmpty().trim().escape(),
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
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.errors });
    }
    const { firstName, lastName, email, phone, password } = req.body;
    try {
      let employee = await Employees.findOne({ email });
      if (employee) res.status(401).json({ msg: 'Account is already registered!' });
      
      employee = new Employees({
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      // Hash password
      const salt = await bcryptjs.genSaltSync(10);
      employee.password = await bcryptjs.hashSync(password, salt);
      // Generate token in Employees model
      const token = await employee.generateAuthToken();

      await employee.save();
      return res.status(201).json({ token, employee });
    } catch (error) {
      return res.status(500).json({ msg: error });
    }
  }
);

// @route   PATCH /api/users
// @desc    Edit user
// @access  Private

router.patch('/:id',[
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
], auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ msg: errors.errors });
  }
// Check key name if valid 
  const updates = Object.keys(req.body);
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password', 'phone'];
  const isValidUpdates = updates.every((items) =>
    allowedUpdates.includes(items)
  );
  if (!isValidUpdates) {
    return res.status(400).send({ error: 'error updates' });
  }
  try {
    const employee = await Employees.findOne({
      _id: req.params.id,
    });
    if (!employee) {
      throw Error;
    }
    updates.forEach((update) => (employee[update] = req.body[update]));
    // if want to change password
    if (req.body.password) {
      const salt = await bcryptjs.genSaltSync(10);
      employee.password = await bcryptjs.hashSync(req.body.password, salt);
    }
    await employee.save();
    return res.status(200).json(employee);
  } catch (error) {
   
    return res.status(400).json({ msg: 'Something went wrong!' });
  }
});


// @route DELETE /api/employees
// @desc  Delete employee acount
// @access Private

router.delete('/:id', auth, async (req, res) => {
  try {
     
   const user = await Employees.findByIdAndDelete(req.params.id) 
   
if(!user) return res.status(404).send({ msg: 'User not found!'})

 
     return res.status(200).send({msg: "Deleted Successfully!"})
    
  } catch (error) {
    return res.status(500).send('Server Error!')
  }
})
 

export default router;
