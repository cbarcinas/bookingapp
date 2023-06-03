import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (err, req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return next(createError(401, 'Access denied, not authenticated'));
  }

  try {
    const jwtSecretKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, jwtSecretKey);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(401, 'Token is not valid'));
  }
};
