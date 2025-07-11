import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: '192.168.10.16',
    password: 'Acaiconxego@2025',
    user: 'acaiconxego',
    database: 'acaiconxegoPD',
    port: 51895,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default pool
