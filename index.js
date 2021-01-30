import express from 'express';
import setupDatabase from './server/config/database';
import setupExpress from './server/config/express';
import setupRoutes from './server/config/routes';
import settings from './server/config/settings';

const { port } = settings;
const app = express();

startApp();

async function startApp() {
  await setupDatabase();
  setupExpress(app);
  setupRoutes(app);

  app.listen(port, () => console.log(`Server is running on port ${port}...`));
}
