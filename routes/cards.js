const express = require('express');
const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike, handleError,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', express.json(), createCard);

router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', express.json(), putLike);

router.delete('/cards/:cardId/likes', express.json(), deleteLike);

router.get('*', handleError);

module.exports = router;
