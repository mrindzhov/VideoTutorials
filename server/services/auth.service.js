import bcrypt from 'bcrypt';
import { check } from 'express-validator';
import User from '../models/User';

const SALT_ROUNDS = 10;

export async function generatePasswordHash(password) {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function hashPassword(next) {
  try {
    const hash = await generatePasswordHash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.error(err);
    throw error;
  }
}

export async function seedAdmin() {
  const admin = await User.findById(defaultAdminUser._id);
  if (admin) return;

  await User.create(defaultAdminUser);

  console.log('Admin seeded!');
}

export const defaultAdminUser = {
  _id: '602a6a843a160d74a0a8af2f',
  username: 'kingsize252',
  password: 'dummy-password',
};

export const loginValidation = [
  check('username')
    .isLength({ min: 5 })
    .withMessage('The username should be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('The username should consist only english letters and digits'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('The password should be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('The password should consist only english letters and digits'),
];

export const registerValidation = [
  ...loginValidation,
  check('repeatPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('The repeat password should be equal to the password');
    }
    return true;
  }),
];
