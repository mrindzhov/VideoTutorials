import { Router } from 'express';
import {
  getAllCourses,
  getCoursesByTitle,
  getTopCourses,
} from '../services/courses.service';

const router = Router();

router.get('/', async (req, res) => {
  req.isAuthenticated()
    ? res.render('home/user', {
        pageTitle: 'Home',
        courses: req.query?.searchText
          ? await getCoursesByTitle(req.query.searchText)
          : await getAllCourses(),
        ...req.query,
      })
    : res.render('home/guest', {
        pageTitle: 'Home',
        courses: await getTopCourses(),
      });
});

export default router;
