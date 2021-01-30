import mongoose from 'mongoose';
import { seedCourses } from '../utils/db-seed';
import settings from './settings';

mongoose.Promise = global.Promise;

export default async function setupDatabase() {
  try {
    await mongoose.connect(settings.connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB ready!');

    seedCourses();

    console.log('Courses seeded!');
  } catch (error) {
    console.log(`Database error: ${err}`);
  }
}
