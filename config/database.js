const mysql = require('mysql2')
const util = require('util')
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'Alemania9',
    database: 'Proyecto_Final'
})

pool.query = util.promisify(pool.query)
module.exports = pool;