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
    db: 'mongodb://localhost:27017/test',
    mysql: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'api_generator',
      charset: 'utf8'
    }
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
