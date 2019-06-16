export default app => {
  const Courses = app.models.courses;

  app.get('/courses', (req, res) => {
    Courses.find({}, (err, courses) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(courses);
    });
  });

  app.get('/courses/:courseId', (req, res) => {
    const { courseId } = req.params;
    Courses.findById(courseId, (err, course) => {
      if (err) {
        return res.status(412).json(err);
      }
      if (course) {
        return res.json(course);
      }
      return res.status(404).end();
    });
  });

  app.post('/courses', (req, res) => {
    const course = req.body;
    Courses.create(course, (err, newTask) => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.json(newTask);
    });
  });

  app.put('/courses/:courseId', (req, res) => {
    const { courseId } = req.params;
    const course = req.body;
    Courses.update({ _id: courseId }, { $set: course }, err => {
      if (err) {
        return res.status(412).json(err);
      }
      Courses.findById(courseId, (findErr, newTask) => {
        if (findErr) {
          return res.status(412).json(err);
        }
        return res.json(newTask);
      });
      return true;
    });
  });

  app.delete('/courses/:courseId', (req, res) => {
    const { courseId } = req.params;
    Courses.findByIdAndRemove(courseId, err => {
      if (err) {
        return res.status(412).json(err);
      }
      return res.status(204).end();
    });
  });
};
