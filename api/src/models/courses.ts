import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  syllabus: { type: String, required: true },
  description: { type: String, required: true }
});
export default mongoose.model('courses', schema);
