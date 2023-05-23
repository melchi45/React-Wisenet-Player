// tiny wrapper with default env vars
module.exports = {
  BUILD_TPYE: process.env.BUILD_TPYE || 'app',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT_EXTENSION: process.env.PORT || 3000,
  PORT_APP: process.env.PORT || 3001,
};
