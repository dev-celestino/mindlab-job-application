import * as express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({
    status: 'success',
    message: 'Mindlab API',
    data: { version_number: 'v1.0.0' }
  });
});

export default router;
