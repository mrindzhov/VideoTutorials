import mongoose from 'mongoose';
import { seedCourses } from '../features/courses/service';
import { seedAdmin } from '../services/auth.service';
import settings from './settings';

mongoose.Promise = global.Promise;

export default async function setupDatabase() {
  try {
    await mongoose.connect(settings.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });
    console.log('MongoDB ready!');

    await seedAdmin();
    await seedCourses();
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
}
