import express from 'express';
import handlebars from 'express-handlebars';

export default function setupExpress(app) {
  setupViewEngine(app);

  app.use(express.static('public'));

  app.use((err, req, res, next) => {
    res.type('text/plain');
    res.status(500);
    res.send(err);
  });

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

function layoutDataMiddleware(req, res, next) {
  res.locals.username = 'Jo';
  res.locals.isAuth = false;
  res.locals.courses = courseDtos;

  next();
}
