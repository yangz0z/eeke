const maria = require('mysql')

const conn = maria.createConnection({
    host : process.env.DB_HOST || '127.0.0.1',
    port : process.env.DB_PORT || '3306',
    user :process.env.DB_USER || 'root',
    password : process.env.DB_PASSWORD || '1234',
    database : 'project',
    timezone : 'Asia/Seoul'
});

module.exports = conn