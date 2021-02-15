const env = process.env.NODE_ENV || 'development';

const appSettings = {
  development: {
    ALWAYS_AUTHENTICATED: true,
    connectionString: 'mongodb://localhost:27017/videoTutorials',
    port: 1337,
  },
  staging: {},
  production: {
    port: process.env.PORT,
  },
};
export default appSettings[env];
