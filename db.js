const Pool = require('pg').Pool

const pool = new Pool ({
    user: 'postgres',
    password: '',
    database: 'bird_types',
    host:'localhost',
    port:5432
})

module.exports = pool;