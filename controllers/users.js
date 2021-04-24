const userModel = require('../models/user');

function getUsers(_, res) {
  userModel.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function getUsersById(req, res) {
  const { id } = req.params;
  userModel.findById(id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: 'Пользователь по указанному _id не найден' }));
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;
  userModel.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' }));
}

module.exports = {
  getUsers,
  getUsersById,
  createUser,
};
