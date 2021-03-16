const express = require('express');
const { request } = require('./request.controller');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();

//parent route api/request

router.post('/new', verifyToken, request);

module.exports = router; 
