var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    port = 8000;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-blog-api'
    },
    port: port,
    db: 'mongodb://localhost/dbblog',
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-blog-api'
    },
    port: port,
    db: 'mongodb://128.199.91.28:27017/dbblog-production',
  }
};

module.exports = config[env];
