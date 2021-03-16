const db = require('../../database/connection');

module.exports = {
    requestQuery: (data, callback) => {
        const { request_id, sender_id, recipient_id, title, purpose, message } = data;
        const sql = 'insert into request(request_id, sender_id, recipient_id, title, purpose, message) values(?, ?, ?, ?, ?, ?)';

        db.query(
            sql,
            [
                request_id,
                sender_id,
                recipient_id,
                title,
                purpose,
                message
            ],  
            (err, result) => {
                if(err) {
                    return callback(err);
                }

                return callback(null, result);
            }
        );
        
    }
}