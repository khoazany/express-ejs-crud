var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'f'
    },
    port: 3000,
    db: 'mongodb://localhost/f-development'
    
  },

  test: {
    root: rootPath,
    app: {
      name: 'f'
    },
    port: 3000,
    db: 'mongodb://localhost/f-test'
    
  },

  production: {
    root: rootPath,
    app: {
      name: 'f'
    },
    port: 3000,
    db: 'mongodb://localhost/f-production'
    
  }
};

module.exports = config[env];
