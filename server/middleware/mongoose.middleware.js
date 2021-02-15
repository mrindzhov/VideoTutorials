import mongoose from 'mongoose';

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
