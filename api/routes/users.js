import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// This endpoint will go to verifyToken, if all checks inside
// verifyToken pass, then it'll hit next() and proceed with endpoint
router.get('/checkauthentication', verifyToken, (req, res, next) => {
  res.send('Sucessfully logged in user');
});

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

// Get
router.get('/:id', getUser);

// Get All
router.get('/', getAllUsers);

export default router;
