export async function authGuard(req, res, next) {
  if (!req.isAuthenticated()) return res.redirect('/auth/login');
  next();
}

export function anonymousOnly(req, res, next) {
  if (req.isAuthenticated()) return res.redirect('/');
  next();
}
