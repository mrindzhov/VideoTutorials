import Course from './Course';
import { check } from 'express-validator';

export const getAllCourses = async () =>
  await Course.find({ isPublic: true }).sort('-createDate').lean();

export const getTopCourses = async () =>
  await Course.find({ isPublic: true }).sort('-usersEnrolled').limit(3).lean();

export const getCoursesByTitle = async (searchText) =>
  await Course.find({
    isPublic: true,
    title: { $regex: searchText, $options: 'i' },
  }).lean();

export const mapCourseFromBody = (req) => ({
  ...req.body,
  createdBy: req.user._id,
  isPublic: req.body.isPublic !== undefined,
});

export async function seedCourses() {
  const dbCourses = await Course.find({});
  if (dbCourses.length > 0) return;

  const createDate = new Date();
  const res = await Course.insertMany(
    defaultCourses.map((c) => ({
      ...c,
      isPublic: true,
      createDate,
      createdBy: defaultAdminUser._id,
    }))
  );

  await User.findByIdAndUpdate(defaultAdminUser._id, {
    $push: { coursesCreated: res.map((c) => c._id) },
  });

  console.log('Courses seeded!');
}

export const defaultCourses = [
  {
    title: 'ExpressJS',
    description: 'ExpressJS is ...',
    imageUrl:
      'https://blog.cyberpanel.net/wp-content/uploads/2019/03/express-js-cyberpanel.jpeg',
  },
  {
    title: 'Angular',
    description: 'Angular is ...',
    imageUrl:
      'https://colorlib.com/wp/wp-content/uploads/sites/2/angular-logo.png',
  },
  {
    title: 'React',
    description: 'React is ...',
    imageUrl:
      'http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png',
  },
];

export const courseValidation = [
  check('title')
    .isLength({ min: 4 })
    .withMessage('The title should be at least 4 characters long'),
  check('description')
    .isLength({ min: 20 })
    .withMessage('The description should be at least 20 characters long')
    .isLength({ max: 50 })
    .withMessage('The description should be maximum 50 characters long'),
  check('imageUrl')
    .isURL()
    .withMessage('The imageUrl should start with http or https'),
];
