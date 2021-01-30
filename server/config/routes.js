import { Router } from 'express';

export default function setupRoutes(app) {
  const router = getRouter();
  app.use(router);
}

function getRouter() {
  const router = new Router();

  router.get('/', (req, res) => {
    res.render('home/guest');
  });
  router.get('/about', (req, res) => {
    /*controllers.home.about*/
    res.render('home/guest');
  });

  router.get('/register', (req, res) => {
    /*controllers.users.registerGet*/
    res.render('user/register');
  });
  router.post('/register', (req, res) => {
    /*controllers.users.registerPost*/
  });

  router.get('/login', (req, res) => {
    /*controllers.users.loginGet*/
    res.render('user/login');
  });
  router.post('/login', (req, res) => {
    /*controllers.users.loginPost*/
  });

  router.post('/logout', (req, res) => {
    /*controllers.users.logout*/
    res.redirect('/');
  });

  router.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
  return router;
}
