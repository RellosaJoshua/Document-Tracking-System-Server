const db = require('../../database/connection');

module.exports = {
    getAllDepartmentsQuery: (callback) => {
        const sql = 'select * from department';

        db.query(sql, (err, result) => {
            if(err) {
                return callback(err);
            }

            return callback(null, result);
        });
    },
    getAllOfficesQuery: (callback) => {
        const sql = 'select * from office'

        
        db.query(sql, (err, result) => {
            if(err) {
                return callback(err);
            }

            return callback(null, result);
        });
    }
}