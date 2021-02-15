import { Router } from 'express';
import { fetchCourse } from '../middleware/courses.middleware';
import { validateId } from '../middleware/mongoose.middleware';
import Course from '../models/Course';
import { mapCourseFromBody } from '../services/courses.service';

const router = Router();
router
  .route('/create')
  .get((req, res) => res.render('course/create'))
  .post(async (req, res) => {
    try {
      const course = new Course(mapCourseFromBody(req));
      const result = await course.save();
      res.redirect(`/courses/${result._id}/details`);
    } catch (error) {
      console.log(error.message);
    }
  });

router.get('/:id/details', validateId, fetchCourse, (req, res) =>
  res.render('course/details', {
    pageTitle: 'Course Details | Video Tutorials',
    course: req.course,
  })
);

router
  .route('/:id/edit')
  .get(validateId, fetchCourse, (req, res) =>
    res.render('course/edit', {
      pageTitle: 'Edit Course | Video Tutorials',
      course: req.course,
    })
  )
  .put(validateId, async (req, res) => {
    const course = mapCourseFromBody(req);
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, course);

    res.redirect(`/courses/${updatedCourse._id}/details`);
  });

export default router;
