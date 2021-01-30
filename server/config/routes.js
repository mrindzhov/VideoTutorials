import { Router } from 'express';

export default function setupRoutes(app) {
  const router = getRouter();
  app.use(router);
}

function getRouter() {
  const router = new Router();

  router.get('/', (req, res) => {
    res.render('home/user', { title: 'Home' });
  });
  router.get('/about', (req, res) => {
    res.render('home/guest', { title: 'About' });
  });

  router.get('/register', (req, res) => {
    res.render('user/register');
  });
  router.post('/register', (req, res) => {});

  router.get('/login', (req, res) => {
    res.render('user/login');
  });
  router.post('/login', (req, res) => {});

  router.post('/logout', (req, res) => {
    res.redirect('/');
  });

  router.get('/course/create', (req, res) => {
    res.render('course/create');
  });

  router.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });

  return router;
}
