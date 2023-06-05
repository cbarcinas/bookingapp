import Joi from 'joi';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// File contains 2 functions Register() & Login()

// Register
// Register
export const register = async (req, res) => {
  // Create Validation Schema
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  // If joi validate() returns an error object, we can
  // send the error message to the client
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // If the email exist we can let the user know
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exists...');

  // Destructure params from the request body then create a new user
  const { username, email, password } = req.body;
  user = new User({ username, email, password });

  // Before sending the user info to the db, use salt to hash the password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  // Saves user document which consists of username,email,password to the db
  await user.save();

  // Create token using generateAuthToken() from utils file
  // The token should never contain sensitive data
  const jwtSecretKey = process.env.JWT_KEY;
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    jwtSecretKey
  );
  res.send(token);
};

// Login Function
// Login Function
export const login = async (req, res) => {
  // Validate email and password
  const schema = Joi.object({
    username: Joi.string().min(3).max(200).required(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user email already exists using mongodb func findOne() to search db
  let user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('Username does not exist...');

  // Use bcrypt to compare incoming password from req.body and the user password in the db
  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send('Invalid username or password..');

  // If the password is validated then we can proceed to creating a new token to hide user data
  const jwtSecretKey = process.env.JWT_KEY;
  const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, jwtSecretKey);

  // We need to hide the password and isAdmin
  const { password, isAdmin, ...otherDetails } = user._doc;
  res
    .cookie('access_token', token, {
      httpOnly: true,
    })
    .status(200)
    .json({ ...otherDetails });
};
