const db = require('../database/connection');

module.exports = {
    checkIfAdminExist: (req, res, next) => {
        const sql = 'select * from user_account where isSystemAdmin = ?';

        db.query(sql, true, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'server error'
                });
            } 
            
            if(result[0]) {
                return res.status(409).json({
                    success: false,
                    message: 'unable to process your request, an account for system admin already exist'
                });
            }

            next();
        });
    }
}