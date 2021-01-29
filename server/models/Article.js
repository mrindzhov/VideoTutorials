import { Schema, Types, model } from 'mongoose';
import { userSchemaName } from './User';

const ArticleSchema = new Schema({
  id: Types.ObjectId,
  title: { type: String, required: true, minlength: 5, unique: true },
  description: { type: String, required: true, minlength: 20 },
  articleAuthor: { type: Types.ObjectId, ref: userSchemaName },
  createDate: { type: Date, default: new Date() },
});

export const articleSchemaName = 'Article';
export default model(articleSchemaName, ArticleSchema);
