const mysql = require('mysql');

const db = mysql.createConnection(require('./config'));

db.connect(function(err){
        if(err){
                throw err;
                return;
        }
        console.log('Connected to database');
});

module.exports = db;
