const userModel = require('../models/user');

function getUsers(_, res) {
  userModel.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUsersById(req, res) {
  const { userId } = req.params;
  userModel.findById(userId)
    .then((user) => res.send(user))
    .catch(() => res.status(404).send({ message: 'Пользователь по указанному _id не найден' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
}

function updateUser(req, res) {
  const { name, about } = req.body;
  const { _id } = req.user;
  userModel.findByIdAndUpdate(
    _id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => res.send(user))
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
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
    .then((user) => res.send(user))
    .catch(() => {
      res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
    });
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  updateAvatar,
};
