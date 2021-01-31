import coursesData from './courses-data';
import Course from '../models/Course';

export async function seedCourses() {
  const dbCourses = await Course.find({});
  if (dbCourses.length > 0) return;

  coursesData.forEach((course) => {
    Course.create(course);
  });
}
