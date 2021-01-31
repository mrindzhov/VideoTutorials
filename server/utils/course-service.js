import Course from '../models/Course';

export async function getAllCourses() {
  // TODO: all public courses
  // sorted in descending order by the created time
  return await Course.find({}).lean();
}
export async function getTopCourses() {
  // TODO: the top three (3) public courses
  // ordered by the count of enrolled in users in descending order.
  return await Course.find({}).lean();
}

export const mapCourseFromBody = (req) => ({
  ...req.body,
  isPublic: req.body.isPublic === 'on',
});
