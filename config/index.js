var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    port = 8081;

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-blog-api'
    },
    port: port,
    db: 'mongodb://mongodb:27017/test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-blog-api'
    },
    port: port,
    db: 'mongodb://mongodb:27017/test',
  }
};

module.exports = config[env];
