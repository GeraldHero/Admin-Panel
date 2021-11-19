import jwt from 'jsonwebtoken';
import Employees from '../model/Employees.js';
export default async function (req, res, next) {
  
  try {
   // Get token from header
  const token = await req.header('x-auth-token'); 
  if (!token) res.status(401).json({ msg: 'Not authorized!' });
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  // Check token if valid on database   
  const employee = await Employees.findOne({ _id: decoded.id, 'tokens.token': token})
    if(!employee) throw new Error
  // If authorize data will inherit 
    req.token = token
    req.user = employee;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
