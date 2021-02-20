import { validationResult } from 'express-validator';

export const urlValidator = {
  validator: (val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
  },
  message: 'Invalid URL.',
};

export function validateRequest(template = '', storeErrorInSession = false) {
  return function (req, res, next) {
    const errorResult = validationResult(req);
    const isEmpty = errorResult.isEmpty();

    if (isEmpty) return next();

    const error = errorResult.errors.map((e) => ({ ...e, message: e.msg }))[0];
    const validationErrors = { error, formData: req.body };

    if (storeErrorInSession) {
      req.session.validationErrors = validationErrors;
      res.redirect(req.originalUrl.split('?')[0]);
    } else {
      template = template || req.originalUrl.slice(1, req.originalUrl.length);
      res.render(template, { ...req, ...validationErrors });
    }
  };
}
