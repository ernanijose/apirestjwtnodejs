const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.PORT_DB,
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    database: process.env.DATABASE,
    connectionLimit: 10
});

module.exports = pool;
