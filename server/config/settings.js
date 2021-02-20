const env = process.env.NODE_ENV || 'development';

const appSettings = {
  development: {
    appTitle: 'Video Tutorials',
    ALWAYS_AUTHENTICATED: false,
    connectionString: 'mongodb://localhost:27017/videoTutorials',
    port: 1338,
  },
  staging: {},
  production: {
    port: process.env.PORT,
  },
};
export default appSettings[env];
