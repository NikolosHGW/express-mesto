const express = require('express');
const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', express.json(), createCard);

router.delete('/cards/:cardId', deleteCard);

module.exports = router;
