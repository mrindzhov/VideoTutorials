import { Router } from 'express';
import { authGuard } from '../../middleware/endpoints.middleware';
import { validateId } from '../../middleware/mongoose.middleware';
import User from '../../models/User';
import { validateRequest } from '../../services/validation.service';
import Course from './Course';
import { fetchCourse } from './middleware';
import { courseValidation, mapCourseFromBody } from './service';

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
  .get(validateId, fetchCourse, (req, res) => {
    const templateConfig = {
      pageTitle: 'Edit Course | Video Tutorials',
      formData: { ...req.course, ...req.session.validationErrors?.formData },
      error: req.session.validationErrors?.error,
    };

    if (req.session.validationErrors) delete req.session.validationErrors;

    return res.render('course/edit', templateConfig);
  })
  .put(
    validateId,
    courseValidation,
    validateRequest(null, true),
    async (req, res) => {
      try {
        const updatedCourse = await Course.findByIdAndUpdate(
          req.params.id,
          mapCourseFromBody(req)
        );

        res.redirect(`/courses/${updatedCourse._id}/details`);
      } catch (error) {
        req.session.validationErrors = { error, formData: req.body };
        res.redirect(req.originalUrl.split('?')[0]);
      }
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
