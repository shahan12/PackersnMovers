var pg  = require("pg").Pool;

var con = new pg({
    host: 'localhost',
    user: 'postgres',
    password: 'postgresarun',
    database: 'shiftkart',
    port:5432
});

module.exports = con;