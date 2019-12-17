let mysql = require('mysql');

const connection = mysql.createConnection({
    
    host:'localhost',
    user:'root',
    password: 'root',
    database: 't_shirt'

});

module.exports = connection;