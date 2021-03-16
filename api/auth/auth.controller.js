const { sign, verify } = require('jsonwebtoken');
const { compareSync } = require('bcrypt');
const { loginQuery, getAuthUserQuery } = require('./auth.service');
const authConfig = require('../../config/auth.config');

module.exports = {
    login: (req, res) => {
        const credentials = {
            username: req.body.username,
            password: req.body.password
        }

        loginQuery(credentials.username, (err, result) => {
            if(err) {
                return res.staus(500).json({
                    success: false,
                    message: 'server error'
                });
            }
                        
            if(!result) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            const isPasswordCorrect = compareSync(credentials.password, result.password);

            if(!isPasswordCorrect) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password'
                });
            }

            const { user_id } = result;

            const accessToken = sign({ id: user_id }, authConfig.AUTH_SECRET_KEY, {
                expiresIn: '24h'
            });

            result.password = undefined;

            return res.status(200).json({
                success: true,
                user: result,
                accessToken
            });
        });
    },
    isAuth: (req, res) => {
        const accessToken = req.headers['x-access-token'];

        if(!accessToken) {
            return res.json(false);
        }

        verify(accessToken, authConfig.AUTH_SECRET_KEY, (err, decoded) => {
            if(err) {
                return res.json(false);
            } else {
                return res.json(true);
            }
        });
    },
    getAuthUser: (req, res) => {
        const user_id = req.user_id;

        getAuthUserQuery(user_id, (err, result) => {
            if(err) {
                return res.status(500).json({
                    success: false,
                    message: 'Server error'
                });
            }

            return res.status(200).json({
                success: true,
                user: result
            });
        });
    }
}