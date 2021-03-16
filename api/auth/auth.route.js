const express = require('express');
const { login, isAuth, getAuthUser } = require('./auth.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const { verifyAuthUser } = require('../../middleware/verifyAuthUser');

const router = express.Router();

// parent route api/auth

router.post('/login', login);
router.post('/isauth', isAuth);
router.get('/authuser', [verifyAuthUser], getAuthUser);

module.exports = router;