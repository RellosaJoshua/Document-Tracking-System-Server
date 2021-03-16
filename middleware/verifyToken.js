const db = require('../database/connection');
const { verify } = require('jsonwebtoken');
const authConfig = require('../config/auth.config');

module.exports = {
    verifyToken:(req, res, next) => {
        const accessToken = req.headers['x-access-token'];

        if(!accessToken) {
            return res.status(400).json({
                success: false,
                message: 'No token provided'
            }); 
        }

        verify(accessToken, authConfig.AUTH_SECRET_KEY, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                }); 
            }

            req.user_id = decoded.id;
            next();
        });
    },
    isAdmin:(req, res, next) => {
        const user_id = req.user_id;
        const sql = 'select * from user_account where user_id = ?';

        db.query(sql, user_id, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                }); 
            }

            if(!result[0].isSystemAdmin) {
                return res.status(403).json({
                    success: false,
                    message: 'System Admin role is required'
                });
            }

            next();
        });
    }
}