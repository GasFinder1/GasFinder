import database from "../repository/connection.js";

async function login(email, password) {
  const sql = "select * from tbl_usuario where email = ? and senha = ?;";
  const dataLogin = [email, password];
  const conn = await database.connect();
  const [rows] = await conn.query(sql, dataLogin);
  console.log(rows)
  conn.end();

  return rows;
}

export default { login };