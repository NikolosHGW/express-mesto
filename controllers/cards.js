const cardModel = require('../models/card');

function getCards(_, res) {
  cardModel.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  const { _id: owner } = req.user;
  cardModel.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(() => res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' }));
}

function deleteCard(req, res) {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .orFail(new Error('Not found'))
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function putLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  )
    .orFail(new Error('Not found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

function deleteLike(req, res) {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardModel.findByIdAndUpdate(
    cardId,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new Error('Not found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан невалидный id' });
      } else if (err.message === 'Not found') {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  putLike,
  deleteLike,
};
