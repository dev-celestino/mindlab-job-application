import * as request from 'supertest';

import app from '../../index';

describe('Routes: Users', () => {
  const Users = app.models.users.default();
  const users = [
    {
      _id: '577c68c99c1c91dd96db5637',
      name: 'John Doe',
      password: '123',
      courses: []
    },
    {
      _id: '577c68ff9c1c91dd96db5638',
      name: 'John Doe 2',
      password: '123',
      courses: []
    }
  ];

  beforeEach(done => {
    Users.remove({}, () => Users.insertMany(users, done));
  });

  describe('GET /users', () => {
    describe('status 200', () => {
      it('returns a list of users', done => {
        request(app)
          .get('/users')
          .expect(200)
          .end((err, res) => {
            expect(res.body).toHaveLength(2);
            expect(res.body).toContain(users[0]);
            expect(res.body).toContain(users[1]);
            done(err);
          });
      });
    });
  });

  describe('POST /users', () => {
    describe('status 200', () => {
      it('creates a new user', done => {
        request
          .post('/users')
          .send({ name: 'John Doe 3', password: '123', courses: [] })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).toEqual('John Doe 3');
            done(err);
          });
      });
    });
  });

  describe('GET /users/:id', () => {
    describe('status 200', () => {
      it('returns one user', done => {
        request
          .get(`/users/${users[0]._id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).toEqual(users[0]._id);
            expect(res.body.name).toEqual(users[0].name);
            expect(res.body.password).toEqual(users[0].password);
            expect(res.body.courses).toEqual(users[0].courses);
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when user not exist', done => {
        request
          .get('/users/id-not-exist')
          .expect(404)
          .end(err => done(err));
      });
    });
  });

  describe('PUT /users/:id', () => {
    describe('status 200', () => {
      it('updates a user', done => {
        request
          .put(`/users/${users[0]._id}`)
          .send({ password: '1234' })
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).toEqual(users[0]._id);
            expect(res.body.name).toEqual('John Doe');
            expect(res.body.password).toEqual('1234');
            done(err);
          });
      });
    });
  });

  describe('DELETE /users/:id', () => {
    describe('status 204', () => {
      it('removes a user', done => {
        request
          .delete(`/users/${users[0]._id}`)
          .expect(204)
          .end(err => done(err));
      });
    });
  });
});
