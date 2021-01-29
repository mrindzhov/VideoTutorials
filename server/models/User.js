import { Schema, Types, model } from 'mongoose';
import { articleSchemaName } from './Article';

const UserSchema = new Schema({
  id: Types.ObjectId,
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  articles: [{ type: Types.ObjectId, ref: articleSchemaName }],
});

export const userSchemaName = 'User';
export default model(userSchemaName, UserSchema);
