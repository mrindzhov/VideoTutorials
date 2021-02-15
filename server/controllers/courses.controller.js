import { Router } from 'express';
import { fetchCourse } from '../middleware/courses.middleware';
import { authGuard } from '../middleware/endpoints.middleware';
import { validateId } from '../middleware/mongoose.middleware';
import Course from '../models/Course';
import User from '../models/User';
import { mapCourseFromBody } from '../services/courses.service';
import {
  courseValidation,
  validateRequest,
} from '../services/validation.service';

const router = Router();
router.use(authGuard);

router
  .route('/create')
  .get((req, res) => res.render('course/create'))
  .post(
    courseValidation,
    validateRequest('course/create'),
    async (req, res) => {
      try {
        const course = await Course.create(mapCourseFromBody(req));

        await User.findByIdAndUpdate(
          req.user._id,
          { $push: { coursesCreated: course._id } },
          { new: true }
        );

        res.redirect(`/courses/${course._id}/details`);
      } catch (error) {
        res.render('course/create', { error, formData: req.body });
      }
    }
  );

router
  .route('/:id/edit')
  .get(validateId, fetchCourse, (req, res) =>
    res.render('course/edit', {
      pageTitle: 'Edit Course | Video Tutorials',
      course: req.course,
    })
  )
  .put(
    validateId,
    courseValidation,
    validateRequest('course/edit'),
    async (req, res) => {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.id,
        mapCourseFromBody(req)
      );

      res.redirect(`/courses/${updatedCourse._id}/details`);
    }
  );

router.post('/:id/enroll', validateId, async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { $push: { usersEnrolled: req.user._id } },
    { new: true }
  ).lean();

  await User.findByIdAndUpdate(
    req.user._id,
    { $push: { coursesEnrolled: req.params.id } },
    { new: true }
  );

  res.redirect(`/courses/${course._id}/details`);
});

router.delete('/:id', validateId, fetchCourse, async (req, res) => {
  if (req.isCreatedByUser) {
    await Course.deleteOne({ _id: req.params.id });
    res.redirect('/');
  }
  res.end();
});

router.get('/:id/details', validateId, fetchCourse, async (req, res) =>
  res.render('course/details', {
    pageTitle: 'Course Details | Video Tutorials',
    course: req.course,
    isCreatedByUser: req.isCreatedByUser,
    isUserEnrolled: req.isUserEnrolled,
  })
);

export default router;
