import mongoose from 'mongoose';
import Course from '../models/Course';
import { defaultCourses } from '../services/courses.service';
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

    await seedCourses();
  } catch (error) {
    console.log(`Database error: ${err}`);
  }
}

async function seedCourses() {
  const dbCourses = await Course.find({});
  if (dbCourses.length > 0) return;

  defaultCourses.forEach((course) => {
    Course.create(course);
  });
  console.log('Courses seeded!');
}
