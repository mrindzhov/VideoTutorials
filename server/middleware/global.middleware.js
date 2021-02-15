export async function globalLayoutDataMiddleware(req, res, next) {
  res.locals = {
    pageTitle: 'Video Tutorials',
    username: req.user?.username,
    isAuth: req.isAuthenticated(),
  };

  next();
}
