import Course from '../models/Course';

export async function getAllCourses() {
  // TODO: all public courses
  // sorted in descending order by the created time

  return await Course.find({}).lean();
}
export async function getTopCourses() {
  // TODO: the top three (3) public courses
  // ordered by the count of enrolled in users in descending order.
  //[{$sortByCount:'usersEnrolled'},{$filter:[]}]
  return await Course.find({}).lean();
}

export const mapCourseFromBody = (req) => ({
  ...req.body,
  isPublic: req.body.isPublic === 'on',
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
