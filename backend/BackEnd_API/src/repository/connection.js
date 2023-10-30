import mysql2 from "mysql2/promise";
import 'dotenv/config';

async function connect() {
  const connection = await mysql2.createConnection({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
  });
  return connection;
}

async function getConnection() {
  try {
    const conn = await connect();
    return conn;
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
    return null;
  }
}

export default { getConnection, connect };