import { Router } from 'express';
import passport from 'passport';
import { anonymousOnly, authGuard } from '../middleware/endpoints.middleware';
import User from '../models/User';
import {
  loginValidation,
  registerValidation,
  validateRequest,
} from '../services/validation.service';

const router = Router();

router.get('/logout', authGuard, (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use(anonymousOnly);

router
  .route('/register')
  .get((req, res) => res.render('auth/register'))
  .post(registerValidation, validateRequest(), (req, res) => {
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
  .get((req, res) => res.render('auth/login'))
  .post(loginValidation, validateRequest(), (req, res) =>
    passport.authenticate('local', (err, user, errorMessage) => {
      if (errorMessage)
        res.render('auth/login', { error: errorMessage, formData: req.body });
      else if (user) req.login(user, (err) => !err && res.redirect('/'));
    })(req, res)
  );

export default router;
