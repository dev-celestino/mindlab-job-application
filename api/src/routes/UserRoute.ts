import * as express from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

router
  .route('/users')
  .get(UserController.get)
  .post(UserController.post);

router
  .route('/users/:id')
  //   .all(passport.authenticate())
  .get(UserController.get)
  .put(UserController.put)
  .delete(UserController.delete);

export default router;
