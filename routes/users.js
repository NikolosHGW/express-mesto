const express = require('express');
const router = require('express').Router();
const {
  getUsers, getUsersById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUsersById);

router.post('/users', express.json(), createUser);

router.patch('/users/me', express.json(), updateUser);

router.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = router;
