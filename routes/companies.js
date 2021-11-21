import express from "express";
import sharp from "sharp";
import multer from "multer";
import { check, param, validationResult } from "express-validator";
import auth from "../middleware/auth.js";
import Companies from "../model/Companies.js";
const router = express.Router();

// @route   GET api/companies
// @desc    Get All Companies Data
// @access  Private

router.get("/", auth, async (req, res) => {
  try {
    const companies = await Companies.find();
    return res.status(200).send(companies);
  } catch (error) {
    return res.status(500).send({ msg: "Something went wrong :(" });
  }
});

// @route   GET api/companies/:id
// @desc    Get Specific company Data
// @access  Private

router.get("/:id", auth, async (req, res) => {
  try {
    const companies = await Companies.findOne({ _id: req.params.id });
    if (!companies) return res.status(404).send({ msg: "User not found" });
    return res.status(200).send(companies);
  } catch (error) {
    return res.status(500).send({ msg: "Something went wrong :(" });
  }
});

// @route POST /api/companies
// @desc  Create company
// @access Private

router.post(
  "/",
  auth,
  [
    check("name", "Please insert your company name!")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "Please insert a valid email address")
      .isEmail()
      .notEmpty()
      .normalizeEmail(),
    check("logo"),
    check("website"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ msg: errors.errors });
    }
    const { name, logo, email, website } = req.body;

    try {
      let company = await Companies.findOne({ name });
      if (company)
        res.status(401).json({ msg: "Company name is already registered!" });
      company = new Companies({
        name,
        logo,
        email,
        website,
      });
      await company.save();
    } catch (error) {}
  }
);

export default router;
