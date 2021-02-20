import Course from './Course';

export async function fetchCourse(req, res, next) {
  const course = await Course.findById(req.params.id).lean();

  if (course) {
    req.course = course;
    req.isCreatedByUser = course.createdBy._id.equals(req.user._id);
    req.isUserEnrolled = course.usersEnrolled.some((u) =>
      u._id.equals(req.user._id)
    );

    return next();
  }

  res.render('404');
}
