import express from 'express';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import sharp from 'sharp';
import multer from 'multer';
import { check, param, validationResult } from 'express-validator';
import Employees from '../model/Employees.js';

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

export default router;
