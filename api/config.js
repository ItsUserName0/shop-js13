const path = require('path');

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mongo: {
    db: 'mongodb://localhost/shop13',
    options: {useNewUrlParser: true},
  },
  facebook: {
    appId: '514365783419979',
    appSecret: '275168c192b3f80d5c0ccfc21147f64a',
  }
};