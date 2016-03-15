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
    db: 'mongodb://mongodb:27017/dict',
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-blog-api'
    },
    port: port,
    db: 'mongodb://mongodb:27017/dict',
  }
};

module.exports = config[env];
