import * as mongoose from 'mongoose';

const db = mongoose.connect(
  'mongodb://admin:admin@cluster0-ung1x.mongodb.net/test?retryWrites=true&w=majority',
  {
    useMongoClient: true
  }
);

export default db;
