const mysql = require('mysql2');
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSWLDATABASE 
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected!');
});

module.exports = db;