import jwt from 'jsonwebtoken';
import { createError } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.user = user;
    next();
  });
};

// export const verifyUser = (err,req, res, next) => {
//   verifyToken(req, res, () => {
//     // compare the id from out jwt token to id coming in from path params /checkuser/:id
//     if (decoded.id === req.params.id || decoded.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(401, 'Access denied, not authorized'));
//     }
//   });
// };
