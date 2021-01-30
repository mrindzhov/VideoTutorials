import express from 'express';
import handlebars from 'express-handlebars';
import Course from '../models/Course';

export default function setupExpress(app) {
  setupViewEngine(app);

  app.use(globalErrorHandler);

  app.use(express.static('public'));

  console.log('Express is ready!');
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
    title: 'Video Tutorial App',
    username: 'Jo',
    isAuth: false,
    courses: await Course.find({}).lean(),
  };

  next();
}
