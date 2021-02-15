import mongoose from 'mongoose';
import { urlValidator } from '../services/validation.service';
import { courseSchemaName, userSchemaName } from './schemas';

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 50 },
  imageUrl: { type: String, required: true, validate: [urlValidator] },
  isPublic: { type: Boolean, default: false },
  usersEnrolled: { type: mongoose.Types.ObjectId, ref: userSchemaName },
  createDate: { type: Date, default: new Date() },
});
const Course = mongoose.model(courseSchemaName, CourseSchema);

export default Course;
