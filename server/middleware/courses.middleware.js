import Course from '../models/Course';

export async function fetchCourse(req, res, next) {
  const course = await Course.findById(req.params.id).lean();
  if (course) {
    req.course = course;
    return next();
  }

  res.redirect('/not-found');
}
