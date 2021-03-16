const mysql = require('mysql');
const dbConfig = require('../config/db.config');

const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

db.connect(err => {
    if(err) throw err;
    console.log('mysql connected');
});

module.exports = db;