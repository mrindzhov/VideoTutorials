import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { courseSchemaName, userSchemaName } from './schemas';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coursesCreated: [{ type: mongoose.Types.ObjectId, ref: courseSchemaName }],
  coursesEnrolled: [{ type: mongoose.Types.ObjectId, ref: courseSchemaName }],
});
userSchema.plugin(passportLocalMongoose, { hashField: 'password' });

const User = mongoose.model(userSchemaName, userSchema);
export default User;
