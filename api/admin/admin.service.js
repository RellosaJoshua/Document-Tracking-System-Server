const db = require('../../database/connection');

module.exports = {
    createSystemAdminQuery: (data, callback) => {
        const { name, email, contact_no, username, password, isSystemAdmin } = data;
        const sql = 'insert into user_account(name, email, contact_no, username, password, isSystemAdmin) values(?, ?, ?, ?, ?, ?)';
    
        db.query(
            sql,
            [
                name,
                email,
                contact_no,
                username,
                password,
                isSystemAdmin
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    createDepartmentUserQuery: (data, callback) => {
        const { name, email, contact_no, department_id, username, password, isDepartment } = data;
        const createUserAccountSql = 'insert into user_account(name, email, contact_no, username, password, isDepartment) values(?, ?, ?, ?, ?, ?)';
        
        db.query(
            createUserAccountSql,
            [
                name,
                email,
                contact_no,
                username,
                password,
                isDepartment
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }

                const createDeparmentUserSql = 'insert into department_user(user_id, department_id) values(?, ?)';

                db.query(createDeparmentUserSql, [result.insertId, department_id], (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result);
                });
            }
        );

    },
    createOfficeUserQuery: (data, callback) => {
        const { name, email, contact_no, office_id, username, password, isOffice } = data;
        const createUserAccountSql = 'insert into user_account(name, email, contact_no, username, password, isOffice) values(?, ?, ?, ?, ?, ?)';
        
        db.query(
            createUserAccountSql,
            [
                name,
                email,
                contact_no,
                username,
                password,
                isOffice
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }

                const createOfficeUserSql = 'insert into office_user(user_id, office_id) values(?, ?)';

                db.query(createOfficeUserSql, [result.insertId, office_id], (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result);
                });
            }
        );
    },
    createAdministrativeUserQuery: (data, callback) => {
        const { name, email, contact_no, administrative_type, username, password, isAdministrative } = data;
        const createUserAccountSql = 'insert into user_account(name, email, contact_no, username, password, isAdministrative) values(?, ?, ?, ?, ?, ?)';
        
        db.query(
            createUserAccountSql,
            [
                name,
                email,
                contact_no,
                username,
                password,
                isAdministrative
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }

                const createAdministrativeUserSql = 'insert into administrative_user(user_id, administrative_type) values(?, ?)';

                db.query(createAdministrativeUserSql, [result.insertId,administrative_type], (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result);
                });
            }
        );
    }
}