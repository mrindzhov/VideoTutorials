import { Router } from 'express';
import authController from '../controllers/auth.controller';
import coursesController from '../features/courses/controller';
import homeController from '../features/home.controller';

const router = Router();

router.use('/', homeController);
router.use('/courses', coursesController);
router.use('/auth', authController);
router.all('*', (req, res) => res.render('404'));

export default router;
