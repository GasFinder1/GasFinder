import database from '../repository/connection.js'

async function checkEmail(email){
  const sql = "SELECT * FROM tbl_usuario WHERE email = ?";
  const dados = [email] 

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  
  conn.end();
  return rows;
}

async function checkCode(email, codigo){
  const sql = "SELECT * FROM tbl_usuario WHERE email = ? and senha = ?";

  const conn = await database.connect();

  const dados = [email, codigo]

  const [rows] = await conn.query(sql, dados);

  conn.end();
  return rows;
} 

async function changePassword(email, newPassword){
  const sql = "UPDATE tbl_usuario SET senha = ? WHERE email = ?";
  const dataNewPass = [newPassword, email];

  const conn = await database.connect();
  await conn.query(sql, dataNewPass);
  conn.end();

}
export async function checkName(userName) {
  const sql = "SELECT * FROM tbl_usuario WHERE nome_usuario = ?";
  const dados = [name_user] 

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  
  conn.end();
  return rows;
}

export default {checkEmail, changePassword, checkCode}