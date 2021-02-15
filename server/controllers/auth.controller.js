import { Router } from 'express';
import passport from 'passport';
import {
  anonymousOnly,
  authGuard,
  matchingPasswordsCheck,
} from '../middleware/endpoints.middleware';
import User from '../models/User';

const router = Router();

router
  .route('/register')
  .get(anonymousOnly, (req, res) => res.render('auth/register'))
  .post(anonymousOnly, matchingPasswordsCheck, (req, res) => {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function (err, user) {
        if (err)
          res.render('auth/register', { error: err, formData: req.body });
        else passport.authenticate('local', { successRedirect: '/' })(req, res);
      }
    );
  });

router
  .route('/login')
  .get(anonymousOnly, (req, res) => res.render('auth/login'))
  .post(anonymousOnly, (req, res) =>
    passport.authenticate('local', (err, user, errorMessage) => {
      if (errorMessage)
        res.render('auth/login', { error: errorMessage, formData: req.body });
      else if (user) req.login(user, (err) => !err && res.redirect('/'));
    })(req, res)
  );

router.get('/logout', authGuard, (req, res) => {
  req.logout();
  res.redirect('/');
});

export default router;
