import setupDatabase from './server/config/database';
import setupExpress from './server/config/express';
import settings from './server/config/settings';

const { port } = settings;

startApp();

async function startApp() {
  await setupDatabase();
  const app = setupExpress();

  app.listen(port, () => console.log(`Server is running on port ${port}...`));
}
