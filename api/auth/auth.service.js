const db = require('../../database/connection');

module.exports = {
    loginQuery: (username, callback) => {
        const loginSql = 'select * from user_account where username = ? OR email = ?';
        
        db.query(loginSql, [username, username], (err, result) => {
            if(err) {
                return callback(err);
            }

            if(result[0]) {
                if(result[0].isSystemAdmin) {
                    return callback(null, result[0]);
                }
    
                if(result[0].isDepartment) {
                   const getDepartmentUserInfo = 'select user_id, name, email, contact_no, username, password, college_name, department_name, isSystemAdmin, created_at \
                                                    from department_user \
                                                    join user_account on department_user.user_id = user_account.user_id \
                                                    join department on department_user.department_id = department.department_id \
                                                    join college on department.college_id = college.college_id \
                                                    where user_account.username = ? OR user_account.email = ?';
    
                    db.query(getDepartmentUserInfo, [username, username], (err, result) => {
                        if(err) {
                            return callback(err);
                        }
    
                        return callback(null, result[0])
                    });
                }
    
                if(result[0].isOffice) {
                    const getOfficeUserInfo = 'select user_id, name, email, contact_no, username, password, office_name, isSystemAdmin, created_at \
                                                from office_user \
                                                join user_account on office_user.user_id = user_account.user_id \
                                                join office office_user.office_id = office.office_id \
                                                where user_account.username = ? OR user_account.email = ?';
    
                    db.query(getOfficeUserInfo, [username, username], (err, result) => {
                        if(err) {
                            return callback(err);
                        }
    
                        return callback(null, result[0]);
                    });
                }
    
                if(result[0].isAdministrative) {
                    const getAdministrativeUserInfo = 'select user_id, name, email, contact_no, username, password, administrative_type, isSystemAdmin, created_at \
                                                        from administrative_user \
                                                        join user_account on administrative_user.user_id = user_account.user_id \
                                                        where user_account.username = ? OR user_account.email = ?';
                    
                    db.query(getAdministrativeUserInfo, [username, username], (err, result) => {
                        if(err) {
                            return callback(err);
                        }
    
                        return callback(null, result[0]);
                    });
                }
            }

            return callback(null, null);

        });
    },
    getAuthUserQuery: (id, callback) => {
        const sql = 'select * from user_account where user_id = ?';
        
        db.query(sql, id, (err, result) => {
            if(err) {
                return callback(err);
            }

            if(result[0].isSystemAdmin) {
                return callback(null, result[0]);
            }

            if(result[0].isDepartment) {
               const getDepartmentUserInfo = 'select user_id, name, email, contact_no, username, password, college_name, department_name, isSystemAdmin, created_at \
                                                from department_user \
                                                join user_account on department_user.user_id = user_account.user_id \
                                                join department on department_user.department_id = department.department_id \
                                                join college on department.college_id = college.college_id \
                                                where user_account.user_id = ?';

                db.query(getDepartmentUserInfo, id, (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result[0])
                });
            }

            if(result[0].isOffice) {
                const getOfficeUserInfo = 'select user_id, name, email, contact_no, username, password, office_name, isSystemAdmin, created_at \
                                            from office_user \
                                            join user_account on office_user.user_id = user_account.user_id \
                                            join office office_user.office_id = office.office_id \
                                            where user_account.user_id = ?';

                db.query(getOfficeUserInfo, id, (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result[0]);
                });
            }

            if(result[0].isAdministrative) {
                const getAdministrativeUserInfo = 'select user_id, name, email, contact_no, username, password, administrative_type, isSystemAdmin, created_at \
                                                    from administrative_user \
                                                    join user_account on administrative_user.user_id = user_account.user_id \
                                                    where user_account.user_id = ?';
                
                db.query(getAdministrativeUserInfo, id, (err, result) => {
                    if(err) {
                        return callback(err);
                    }

                    return callback(null, result[0]);
                });
            }
        });
    }
}