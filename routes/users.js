const express = require('express');
const router = require('express').Router();
const { getUsers, getUsersById, createUser } = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUsersById);

router.post('/users', express.json(), createUser);

module.exports = router;
