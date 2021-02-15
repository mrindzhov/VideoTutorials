import mongoose from 'mongoose';
import Course from '../models/Course';
import User from '../models/User';
import { defaultAdminUser } from '../services/auth.service';
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

    await seedAdmin();
    await seedCourses();
  } catch (error) {
    console.log(`Database error: ${error}`);
  }
}

async function seedAdmin() {
  const admin = await User.findById(defaultAdminUser._id);
  if (admin) return;

  await User.create(defaultAdminUser);

  console.log('Admin seeded!');
}

async function seedCourses() {
  const dbCourses = await Course.find({});
  if (dbCourses.length > 0) return;

  const res = await Course.insertMany(
    defaultCourses.map((c) => ({ ...c, createdBy: defaultAdminUser._id }))
  );

  await User.findByIdAndUpdate(defaultAdminUser._id, {
    $push: { coursesCreated: res.map((c) => c._id) },
  });

  console.log('Courses seeded!');
}
