import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateAuthToken } from '../utils/generateAuthToken.js';

// File contains 2 functions Register() & Login()

// Register
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

  // Save user document to the db
  user = await user.save();

  // Create token using generateAuthToken() from utils file
  const token = generateAuthToken(user);

  res.send(token);
};

// Login Function
// Login Function
// Login Function
export const login = async (req, res) => {
  // Validate email and password
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user email already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('Email already exists...');

  //
  const isValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isValid) return res.status(400).send('Invalid email or password...');

  // If email or password are both true, then we can generate and send the token
  const token = generateAuthToken(user);

  res.send(token);
};
