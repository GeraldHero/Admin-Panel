import bcryptjs from 'bcryptjs';
import { check, validationResult } from 'express-validator';
import Employees from '../model/Employees.js';
import auth from '../middleware/auth.js';

// @route   POST /api/auth
// @desc    Auth/Login user and get token
// @access  Public

export const loginUser = async (req, res) => {
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
};

// @route   POST /api/auth/logout
// @desc    Logout User
// @access  Private
