import mongoose from 'mongoose';
import { courseSchemaName, userSchemaName } from './schemas';

const UserSchema = new mongoose.Schema({
  id: mongoose.Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [{ type: mongoose.Types.ObjectId, ref: courseSchemaName }],
});

const User = mongoose.model(userSchemaName, UserSchema);
export default User;
