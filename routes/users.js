const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');
const {
  getUsers, getUsersById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', cookieParser(), auth, getUsers);

router.get('/users/me', cookieParser(), auth, getCurrentUser);

router.get('/users/:userId', cookieParser(), auth, getUsersById);

router.patch('/users/me', express.json(), cookieParser(), auth, updateUser);

router.patch('/users/me/avatar', express.json(), cookieParser(), auth, updateAvatar);

module.exports = router;
