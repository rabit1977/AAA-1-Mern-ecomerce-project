import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findbyId(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send('Unauthorized');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
