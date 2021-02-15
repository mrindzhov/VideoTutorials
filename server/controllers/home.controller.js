import { Router } from 'express';
import { getAllCourses, getTopCourses } from '../services/courses.service';

const router = Router();

router.get('/', async (req, res) => {
  req.isAuthenticated()
    ? res.render('home/user', {
        pageTitle: 'Home',
        courses: await getAllCourses(),
      })
    : res.render('home/guest', {
        pageTitle: 'Home',
        courses: await getTopCourses(),
      });
});

export default router;
