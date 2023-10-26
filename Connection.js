var pg  = require("pg").Pool;

var con = new pg({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'root',
    port:5432
});

module.exports = con;