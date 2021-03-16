const { hashSync, genSaltSync } = require('bcrypt');
const { 
    createSystemAdminQuery,
    createDepartmentUserQuery,
    createOfficeUserQuery,
    createAdministrativeUserQuery
} = require('./admin.service');
const adminConfig = require('../../config/admin.config');

module.exports = {
    createAdmin:(req, res) => { 
        const admin = {
            name: adminConfig.NAME,
            email: adminConfig.EMAIL,
            contact_no: adminConfig.CONTACT_NO,
            username: adminConfig.USERNAME,
            password: adminConfig.PASSWORD,
            isSystemAdmin: adminConfig.IS_SYSTEM_ADMIN,
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(admin.password, salt);
        admin.password = hashedPassword;

        createSystemAdminQuery(admin, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            }

            return res.status(200).json({
                success:true,
                result,
            });

        });
    },
    createDepartmentUser: (req, res) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            contact_no: req.body.contact_no,
            department_id: req.body.department_id,
            username: req.body.username,
            password: req.body.password,
            isDepartment: true
        }

        const {username, password} = newUserData;

        if(username.length < 6 || password.length < 6)  {
            return res.status(400).json({
                success: false,
                message: 'username and password must be 6 characters or greater'
            });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        newUserData.password = hashedPassword;

        createDepartmentUserQuery(newUserData, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    },
    createOfficeUser: (req, res) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            contact_no: req.body.contact_no,
            office_id: req.body.office_id,
            username: req.body.username,
            password: req.body.password,
            isOffice: true
        }

        const {username, password} = newUserData;

        if(username.length < 6 || password.length < 6)  {
            return res.status(400).json({
                success: false,
                message: 'username and password must be 6 characters or greater'
            });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        newUserData.password = hashedPassword;

        createOfficeUserQuery(newUserData, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    },
    createAdministrativeUser: (req, res) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            contact_no: req.body.contact_no,
            administrative_type: req.body.administrative_type,
            username: req.body.username,
            password: req.body.password,
            isAdministrative: true
        }

        const {username, password} = newUserData;

        if(username.length < 6 || password.length < 6)  {
            return res.status(400).json({
                success: false,
                message: 'username and password must be 6 characters or greater'
            });
        }

        const salt = genSaltSync(10);
        const hashedPassword = hashSync(password, salt);

        newUserData.password = hashedPassword;

        createAdministrativeUserQuery(newUserData, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.status(200).json({
                success: true,
                result
            });
        });
    }
}
