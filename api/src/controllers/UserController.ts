import { default as UserSchema } from '../models/Users';
import { Response, Request } from 'express';

const getUser = (req, res: Response, id) => {
  UserSchema.findById(id, (err, user) => {
    if (err) {
      return res.status(412).json(err);
    }
    if (user) {
      return res.json(user);
    }
    return res.status(404).end();
  });
};

class UserController {
  constructor() {}
  get(req, res) {
    const id = req.params.id;

    if (id) {
      return getUser(req, res, id);
    }

    UserSchema.find({}, (err, users) => {
      console.log(users);

      if (err) {
        return res.status(412).json(err);
      }

      return res.json(users);
    });
  }

  put(req, res) {
    const { userId } = req.params;
    const user = req.body;
    UserSchema.update({ _id: userId }, { $set: user }, err => {
      if (err) {
        return res.status(412).json(err);
      }
      UserSchema.findById(userId, (findErr, newTask) => {
        if (findErr) {
          return res.status(412).json(err);
        }
        return res.json(newTask);
      });
      return true;
    });
  }

  delete(req: Request, res) {
    const { userId } = req.params;
    UserSchema.findByIdAndRemove(userId, err => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  }
  post(req: Request, res: Response) {
    const user = req.body;
    UserSchema.create(user, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  }
}

export default new UserController();
