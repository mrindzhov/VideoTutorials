import Course from '../models/Course';

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

export const defaultCourses = [
  {
    isPublic: true,
    title: 'ExpressJS',
    description: 'ExpressJS is ...',
    createDate: new Date(),
    imageUrl:
      'https://blog.cyberpanel.net/wp-content/uploads/2019/03/express-js-cyberpanel.jpeg',
  },
  {
    isPublic: true,
    title: 'Angular',
    description: 'Angular is ...',
    createDate: new Date(),
    imageUrl:
      'https://colorlib.com/wp/wp-content/uploads/sites/2/angular-logo.png',
  },
  {
    isPublic: true,
    title: 'React',
    description: 'React is ...',
    createDate: new Date(),
    imageUrl:
      'http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png',
  },
];
