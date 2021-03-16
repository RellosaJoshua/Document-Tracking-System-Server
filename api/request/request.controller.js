const { v4: uuidv4 } = require('uuid');
const { requestQuery } = require('./request.service');

module.exports = {
    request: (req, res) => {
        const user_id = req.user_id;
        const newRequest = {
            request_id: uuidv4(),
            sender_id: user_id,
            recipient_id: req.body.recipient_id,
            title: req.body.title,
            purpose: req.body.purpose,
            message: req.body.message
        }

        requestQuery(newRequest, (err, result) => {
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