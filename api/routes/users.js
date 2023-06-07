import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../controllers/userController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// Update
router.put('/:id', updateUser);

// Delete
router.delete('/:id', deleteUser);

// Get
router.get('/:id', getUser);

// Get All
router.get('/', getAllUsers);

export default router;

// Test auth status, verify user or admin status

// When the user reaches /checkauthentication endpoint, it will go redirect to verifyToken, if all checks
// inside verifyToken pass, then it'll hit next() and proceed with endpoint which is the response
// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('hello user, you are logged in');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('hello, you are logged in and are able to delete account');
// });

// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send('hello admin, you are logged in and are able to delete any account');
// });
