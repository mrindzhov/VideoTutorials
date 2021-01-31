import { Router } from 'express';
import Course from '../models/Course';
import {
  getAllCourses,
  getTopCourses,
  mapCourseFromBody,
} from '../utils/course-service';
import { fetchCourse, validateId } from '../utils/middleware';

export default function setupRoutes(app) {
  const apiRoutes = getApiRoutes();
  const pagesRouter = getPagesRoutes();
  app.use('/api', apiRoutes);
  app.use('/', pagesRouter);
}

function getPagesRoutes() {
  const router = new Router();

  router.get('/courses/create', (req, res) => {
    res.render('course/create');
  });

  router.get('/', async (req, res) =>
    res.render('home/user', {
      pageTitle: 'Home',
      courses: await getTopCourses(),
    })
  );

  router.get('/about', async (req, res) =>
    res.render('home/guest', {
      pageTitle: 'About',
      courses: await getAllCourses(),
    })
  );

  router.get('/courses/:id/details', validateId, fetchCourse, (req, res) =>
    res.render('course/details', {
      pageTitle: 'Course Details | Video Tutorials',
      course: req.course,
    })
  );

  router.get('/courses/:id/edit', validateId, fetchCourse, (req, res) =>
    res.render('course/edit', {
      pageTitle: 'Edit Course | Video Tutorials',
      course: req.course,
    })
  );

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

  router.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found!');
    res.end();
  });

  return router;
}

function getApiRoutes() {
  const router = new Router();

  router.post('/courses/create', async (req, res) => {
    try {
      const course = new Course(mapCourseFromBody(req));
      const result = await course.save();
      res.redirect(`/courses/${result._id}/details`);
    } catch (error) {
      console.log(error.message);
    }
  });

  router.put('/courses/:id/edit', validateId, async (req, res) => {
    const course = mapCourseFromBody(req);
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, course);

    res.redirect(`/courses/${updatedCourse._id}/details`);
  });

  return router;
}
