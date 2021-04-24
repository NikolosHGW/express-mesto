const cardModel = require('../models/card');

function getCards(_, res) {
  cardModel.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  cardModel.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' }));
}

function deleteCard(req, res) {
  const { id } = req.params;
  cardModel.findById(id)
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена' }));
}

function putLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка' }));
}

function deleteLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные для снятии лайка' }));
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
