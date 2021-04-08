const express = require('express');
const { getAllDepartments, getAllOffices } = require('./utils.controller');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();

//parent route api/utils

router.get('/departments', verifyToken, getAllDepartments);
router.get('/offices', verifyToken, getAllOffices);


module.exports = router;
