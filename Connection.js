var pg  = require("pg").Pool;

var con = new pg({
    host: '178.16.139.203',
    user: 'postgres',
    password: 'Shift@987',
    database: 'shiftkartdb',
    port:5432
});

module.exports = con;