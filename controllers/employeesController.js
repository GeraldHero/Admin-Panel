import Employees from '../model/Employees.js';

// @route   GET api/employees/
// @desc    Get All User Data
// @access  Private

export const getAllUserData = async (req, res) => {
  try {
    const Employee = await Employees.find();
    return res.status(200).send(Employee);
  } catch (error) {
    return res.status(500).send({ msg: 'Something went wrong :(' });
  }
};

// @route   GET api/employees/:id
// @desc    Get Specific User Data
// @access  Private

export const getSpecificUser = async (req, res) => {
  try {
    const employee = await Employees.findOne({ _id: req.params.id });
    if (!employee) return res.status(404).send({ msg: 'User not found' });
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ msg: 'Something went wrong :(' });
  }
};

// @route POST /api/employees
// @desc  Create Employee
// @access Private

export const createEmployee = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  try {
    let employee = await Employees.findOne({ email });
    if (employee)
      res.status(401).json({ msg: 'Account is already registered!' });

    employee = new Employees({
      firstName,
      lastName,
      email,
      phone,
      password,
    });

    // Generate token in Employees model
    const token = await employee.generateAuthToken();

    await employee.save();
    return res.status(201).json({ token, employee });
  } catch (error) {
    return res.status(500);
  }
};

// @route   PATCH /api/users/:id
// @desc    Edit user
// @access  Private

export const editEmployee = async (req, res) => {
  // Check key name if valid
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'firstName',
    'lastName',
    'email',
    'password',
    'phone',
  ];
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
      throw new Error('No user found');
    }
    updates.forEach((update) => (employee[update] = req.body[update]));

    await employee.save();
    return res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: 'Something went wrong!' });
  }
};

// @route DELETE /api/employees/:id
// @desc  Delete employee acount
// @access Private

export const deleteUser = async (req, res) => {
  try {
    const user = await Employees.findByIdAndDelete(req.params.id);

    if (!user) return res.status(404).send({ msg: 'User not found!' });

    return res.status(200).send({ msg: 'Deleted Successfully!' });
  } catch (error) {
    return res.status(500).send('Server Error!');
  }
};
