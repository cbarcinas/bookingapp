import jwt from 'jsonwebtoken';

// 'user' param is coming from authController.js
export const generateAuthToken = (user) => {
  // store jwt key in .env file for security
  const jwtSecretKey = process.env.JWT_KEY;

  // create jwt token, key/values are coming from mongodb
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwtSecretKey
  );

  return token;
};
