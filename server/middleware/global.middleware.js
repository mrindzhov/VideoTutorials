import User from '../models/User';
import { defaultAdminUser } from '../services/auth.service';
import settings from '../config/settings';

export async function globalLayoutDataMiddleware(req, res, next) {
  if (!req.isAuthenticated() && settings.ALWAYS_AUTHENTICATED)
    return await authenticateWithAdminUser(req, next);

  res.locals = {
    brand: settings.appTitle,
    pageTitle: settings.appTitle,
    username: req.user?.username,
    isAuth: req.isAuthenticated(),
  };

  next();
}

async function authenticateWithAdminUser(req, next) {
  const user = await User.findOne({ _id: defaultAdminUser._id });

  return req.login(user, (err) => {
    if (err) console.error(err);
    else next();
  });
}
