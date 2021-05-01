const express = require('express');
const router = require('express').Router();
const {
  getUsers, getUsersById, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUsersById);

router.patch('/users/me', express.json(), updateUser);

router.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = router;
