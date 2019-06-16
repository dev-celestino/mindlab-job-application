import * as mongoose from 'mongoose';
import * as argon2 from 'argon2';
import { randomBytes } from 'crypto';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    password: { type: String, trim: true, required: true },
    courses: { type: Array }
  },
  {}
);
schema.pre('save', async next => {
  const user = this;
  const salt = randomBytes(32);

  if (!user.isModified('password')) return next();
  const passwordHashed = await argon2.hash(user.password, { salt });
  user.password = passwordHashed;
  next();
});

schema.methods.comparePassword = (userPassword, cb) => {
  argon2
    .verify(userPassword, this.password)
    .then(result => cb(null, result))
    .catch(err => cb(err));
};

export default mongoose.model('users', schema);
