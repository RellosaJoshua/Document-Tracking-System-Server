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
router.post('/department-user', createDepartmentUser);
router.post('/office-user', createOfficeUser);
router.post('/administrative-user', createAdministrativeUser);

module.exports = router;