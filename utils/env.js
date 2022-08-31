// tiny wrapper with default env vars
module.exports = {
  BUILD_ENV: process.env.BUILD_ENV || 'development',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
};
