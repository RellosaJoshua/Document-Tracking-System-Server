const db = require('../database/connection');

module.exports = {
    verifyAuthUser: (req, res, next) => {
        const user_id = req.user_id;
        const sql = 'select * from user_account where user_id = ?';

        db.query(sql, user_id, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                })
            }

            req.user_id = user_id;
            next();
        });
    }
}   