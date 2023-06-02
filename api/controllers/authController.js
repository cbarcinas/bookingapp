import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
// import generateAuthToken from '../utils/generateAuthToken.js';

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

  //
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exists...');
};
