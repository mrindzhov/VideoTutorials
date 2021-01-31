import { generateSalt, generateHashedPassword } from '../utilities/encryption';
import { model } from 'mongoose';

const User = model('User');

export function registerGet(req, res) {
  res.render('users/register');
}
export function registerPost(req, res) {
  let reqUser = req.body;
  // Add validations!
  let salt = generateSalt();
  let hashedPassword = generateHashedPassword(salt, reqUser.password);

  User.create({
    username: reqUser.username,
    firstName: reqUser.firstName,
    lastName: reqUser.lastName,
    salt: salt,
    hashedPass: hashedPassword,
  }).then((user) => {
    req.logIn(user, (err, user) => {
      if (err) {
        res.locals.globalError = err;
        res.render('users/register', user);
      }

      res.redirect('/');
    });
  });
}
export function loginGet(req, res) {
  res.render('users/login');
}
export function loginPost(req, res) {
  let reqUser = req.body;
  User.findOne({ username: reqUser.username }).then((user) => {
    if (!user) {
      res.locals.globalError = 'Invalid user data';
      res.render('users/login');
      return;
    }

    if (!user.authenticate(reqUser.password)) {
      res.locals.globalError = 'Invalid user data';
      res.render('users/login');
      return;
    }

    req.logIn(user, (err, user) => {
      if (err) {
        res.locals.globalError = err;
        res.render('users/login');
      }

      res.redirect('/');
    });
  });
}
export function logout(req, res) {
  req.logout();
  res.redirect('/');
}
