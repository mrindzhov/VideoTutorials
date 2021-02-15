export function authGuard(req, res, next) {
  if (!req.user) return res.redirect('/auth/login');
  next();
}

export function anonymousOnly(req, res, next) {
  if (req.user) return res.redirect('/');
  next();
}

export function matchingPasswordsCheck(req, res, next) {
  const { password, repeatPassword } = req.body;

  return password !== repeatPassword
    ? res.render('auth/register', {
        error: { message: 'Password missmatch!' },
        formData: req.body,
      })
    : next();
}
