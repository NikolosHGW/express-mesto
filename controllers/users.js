const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

function getUsers(_, res) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUsersById(req, res) {
  const { userId } = req.params;
  userModel.findById(userId)
    .orFail(new Error('Not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({
      message: 'Переданы некорректные данные при создании пользователя',
    }));
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;
  userModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  const { _id } = req.user;
  userModel.findByIdAndUpdate(
    _id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка' });
      }
    });
}

function login(req, res) {
  const { email, password } = req.body;

  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const { _id } = user;
      const token = jwt.sign(
        { _id },
        'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch((err) => res
      .status(401)
      .send({ message: err.message }));
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
