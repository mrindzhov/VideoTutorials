import { check, validationResult } from 'express-validator';

export const urlValidator = {
  validator: (val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
  },
  message: 'Invalid URL.',
};

export function validateRequest(template) {
  return function (req, res, next) {
    const errorResult = validationResult(req);
    const isEmpty = errorResult.isEmpty();
    if (isEmpty) return next();

    template = template || req.originalUrl.slice(1, req.originalUrl.length);
    const error = errorResult.errors.map((e) => ({ ...e, message: e.msg }))[0];
    res.render(template, { error, formData: req.body });
  };
}

export const loginValidation = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('The username should be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('The username should consist only english letters and digits'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('The password should be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('The password should consist only english letters and digits'),
];

export const registerValidation = [
  ...loginValidation,
  check('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('The repeat password should be equal to the password');
    }
    return true;
  }),
];

export const courseValidation = [
  check('title')
    .isLength({ min: 4 })
    .withMessage('The title should be at least 4 characters long'),
  check('description')
    .isLength({ min: 20 })
    .withMessage('The description should be at least 20 characters long'),

  check('imageUrl')
    .isURL()
    .withMessage('The imageUrl should start with http or https'),
];
