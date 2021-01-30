import express from 'express';
import setupDatabase from './server/config/database';
import setupExpress from './server/config/express';
import setupRoutes from './server/config/routes';
import settings from './server/config/settings';

const app = express();

startup();
async function startup() {
  await setupDatabase(settings);
  setupExpress(app);
  setupRoutes(app);
}

const port = settings.port;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
