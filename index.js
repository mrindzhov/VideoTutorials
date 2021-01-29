import express, { Router } from 'express';
import handlebars from 'express-handlebars';

const routes = createRoutes();

const app = express();

app.engine('hbs', handlebars({ extname: '.hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(routes);

app.use(function (err, req, res, next) {
  //   console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send(err);
});

const port = 5000; //TODO: config.PORT
app.listen(port, () => console.log(`Server is running on port ${port}...`));

// ---------
// ---------
// ---------
// ---------
// ---------
// ---------
// ---------
// ---------
function createRoutes() {
  const router = new Router();

  var homeRouter = getHomeRouter();
  var userRouter = getUserRouter();
  router.use('/', homeRouter);
  router.use('/users', userRouter);

  router.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });
  return router;
}
function getUserRouter() {
  const router = new Router();
  router.get('/users/register', (req, res) => {
    /*controllers.users.registerGet*/
    res.render('/users/register');
  });
  router.post('/users/register', (req, res) => {
    /*controllers.users.registerPost*/
    res.render('/users/register');
  });
  router.get('/users/login', (req, res) => {
    /*controllers.users.loginGet*/
    res.render('/users/login');
  });
  router.post('/users/login', (req, res) => {
    /*controllers.users.loginPost*/
    res.render('/users/login');
  });
  router.post('/users/logout', (req, res) => {
    /*controllers.users.logout*/
    res.render('/users/logout');
  });
  return router;
}

function getHomeRouter(isAuth) {
  const router = new Router();
  router.get('/', (req, res) => {
    console.log('tuk sam ');
    res.render('home/guest', {});
  });

  router.get('/about', (req, res) => {
    /*controllers.home.about*/
    res.render('home/guest', {});
  });

  return router;
}
