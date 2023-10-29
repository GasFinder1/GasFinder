import mysql2 from "mysql2/promise";

async function connect() {
  const connection = await mysql2.createConnection({
    host: "localhost",
    password: "",
    port: 3306,
    database: "gasfinder",
    user: "root",
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