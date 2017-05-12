var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'fiestaiot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/fiestaiot-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'fiestaiot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/fiestaiot-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'fiestaiot'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/fiestaiot-production'
  }
};

module.exports = config[env];
