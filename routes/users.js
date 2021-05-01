const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', getUsers);

router.get('/users/me', cookieParser(), auth, getCurrentUser);

router.get('/users/:userId', getUsersById);

router.patch('/users/me', express.json(), updateUser);

router.patch('/users/me/avatar', express.json(), updateAvatar);

module.exports = router;
