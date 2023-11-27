import mysql2 from "mysql2/promise";
import 'dotenv/config';

// async function connect() {
//   const connection = await mysql2.createConnection({
//     host: process.env.DB_HOST,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     user: process.env.DB_USER,
//   });
//   return connection;
// }

const pool = await mysql2.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  waitForConnections: true,
  connectionLimit: 100,
  maxIdle: 100,
  idleTimeout: 60000,
  queueLimit: 10000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

async function getConnection() {
  try {
    const conn = pool.getConnection();
    return conn;
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
    return null;
  }
}

export default { getConnection };