import bcrypt from 'bcrypt';

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
    console.log(err);
    throw error;
  }
}
