const jwt = require('jsonwebtoken');

const handleAuthError = (res) => res
  .status(401)
  .send({ message: 'Необходима авторизация' });

module.exports = (req, res, next) => {
  try {
    req.user = jwt.verify(req.cookies.jwt, 'some-secret-key');
    next();
  } catch (err) {
    handleAuthError(res);
  }
};
