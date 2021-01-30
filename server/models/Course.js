import mongoose from 'mongoose';
import { urlValidator } from '../utils/db-utils';
import { courseSchemaName, userSchemaName } from './schemas';

const CourseSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,

  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 50 },
  imageUrl: { type: String, required: true, validate: [urlValidator] },
  isPublic: { type: Boolean, default: false },
  usersEnrolled: { type: mongoose.Types.ObjectId, ref: userSchemaName },
  createDate: { type: Date, default: new Date() },
});
const Course = mongoose.model(courseSchemaName, CourseSchema);

export default Course;
