import mongoose from 'mongoose';
import Course from '../models/Course';

export async function fetchCourse(req, res, next) {
  const course = await Course.findById(req.params.id).lean();
  if (course) {
    req.course = course;
    return next();
  }

  res.redirect('/not-found');
}

export const validateId = validateParameter('íd', '/not-found');
export function validateParameter(
  parameter = 'id',
  redirectPath = '/not-found'
) {
  return (req, res, next) => {
    const isValid = mongoose.isValidObjectId(req.params[parameter]);
    !!isValid ? next() : res.redirect(redirectPath);
  };
}
