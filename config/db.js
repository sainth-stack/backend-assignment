import mysql from 'mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './environment.js';
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

// Test the connection
promisePool.getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

export default promisePool;
