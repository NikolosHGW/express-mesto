const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const {
  getCards, createCard, deleteCard, putLike, deleteLike, handleError,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/cards', cookieParser(), auth, getCards);

router.post('/cards', express.json(), cookieParser(), auth, createCard);

router.delete('/cards/:cardId', cookieParser(), auth, deleteCard);

router.put('/cards/:cardId/likes', express.json(), cookieParser(), auth, putLike);

router.delete('/cards/:cardId/likes', express.json(), cookieParser(), auth, deleteLike);

router.get('*', handleError);

module.exports = router;
