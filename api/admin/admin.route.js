const express = require('express');
const { 
    createAdmin, 
    createDepartmentUser,
    createOfficeUser,
    createAdministrativeUser
} = require('./admin.controller');
const { checkIfAdminExist } = require('../../middleware/verifyCreateAdmin');
const { verifyToken, isAdmin } = require('../../middleware/verifyToken');

const router = express.Router();

// parent route api/admin

router.get('/', checkIfAdminExist, createAdmin);
router.post('/department-user', [verifyToken, isAdmin], createDepartmentUser);
router.post('/office-user', [verifyToken, isAdmin], createOfficeUser);
router.post('/administrative-user', [verifyToken, isAdmin], createAdministrativeUser);

module.exports = router;