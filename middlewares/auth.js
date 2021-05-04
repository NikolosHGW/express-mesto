const jwt = require('jsonwebtoken');
const HandError = require('../errors/HandError');

module.exports = (req, _res, next) => {
  try {
    req.user = jwt.verify(req.cookies.jwt, 'some-secret-key');
    next();
  } catch (err) {
    next(new HandError('Необходима авторизация', 401));
  }
};
