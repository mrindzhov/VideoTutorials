import bodyParser from 'body-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import methodOverride from 'method-override';
import setupRoutes from './routes';

export default function setupExpress() {
  const app = express();

  setupViewEngine(app);

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static('public'));

  app.use(methodOverride('_method'));

  setupRoutes(app);

  app.use(globalErrorHandler);

  console.log('Express is ready!');

  return app;
}

function setupViewEngine(app) {
  const hbs = handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: { formatDate: (datetime) => new Date(datetime).toDateString() },
  });

  app.engine('hbs', hbs);
  app.set('view engine', 'hbs');
  app.use(layoutDataMiddleware);
}

function globalErrorHandler(err, req, res, next) {
  res.type('text/plain');
  res.status(500);
  res.send(err);
}

async function layoutDataMiddleware(req, res, next) {
  res.locals = {
    pageTitle: 'Video Tutorials',
    username: 'Jo',
    isAuth: false,
  };

  next();
}
