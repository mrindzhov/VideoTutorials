import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import methodOverride from 'method-override';
import passport from 'passport';
import LocalPassport from 'passport-local';
import { globalLayoutDataMiddleware } from '../middleware/global.middleware';
import User from '../models/User';
import routes from './routes';

export default function setupExpress() {
  const app = express();

  setupViewEngine(app);

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: 'neshto-taino!@#$%',
      resave: false,
      saveUninitialized: false,
    })
  );

  setupPassport(app);

  app.use(methodOverride('_method'));

  app.use(express.static('public'));

  app.use(globalLayoutDataMiddleware);

  app.use(routes);

  console.log('Express is ready!');

  return app;
}

function setupPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalPassport(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

function setupViewEngine(app) {
  const hbs = handlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: { formatDate: (datetime) => new Date(datetime).toDateString() },
  });

  app.engine('hbs', hbs);
  app.set('view engine', 'hbs');
}
