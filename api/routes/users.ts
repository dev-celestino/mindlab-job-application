export default app => {
  const Users = app.models.users;

  app.get('/users', (req, res) => {
    Users.find({}, (err, users) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(users);
    });
  });

  app.get('/users/:userId', (req, res) => {
    const { userId } = req.params;
    Users.findById(userId, (err, user) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (user) {
        return res.json(user);
      }
      return res.status(404).end();
    });
  });

  app.post('/users', (req, res) => {
    const user = req.body;
    Users.create(user, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  });

  app.put('/users/:userId', (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    Users.update({ _id: userId }, { $set: user }, err => {
      if (err) {
        return res.status(412).json(err);
      }
      Users.findById(userId, (findErr, newTask) => {
        if (findErr) {
          return res.status(412).json(err);
        }
        return res.json(newTask);
      });
      return true;
    });
  });

  app.delete('/users/:userId', (req, res) => {
    const { userId } = req.params;
    Users.findByIdAndRemove(userId, err => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
