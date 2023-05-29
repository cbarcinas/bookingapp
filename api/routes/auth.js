import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(' you reached auth end point');
});

export default router;
