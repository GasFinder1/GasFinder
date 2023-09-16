import database from "../repository/connection.js";

async function CreateUser(name_user,email,password){
  const sql="insert into tbl_usuario(nome_usuario,email,senha) values (?,?,?)"
  const values = [name_user,email,password];
  const conn = await database.connect();
  await conn.query(sql, values);
  conn.end();
}
async function UpdateUser(name_user, email, password, idUser){
  const sql = "UPDATE tbl_usuario set nome_usuario = ?, email = ?, senha = ?  WHERE id_usuario = ?";
  const values = [name_user, email, password, idUser];
  const conn = await database.connect();
  await conn.query(sql, values);
  conn.end();
}
async function DeleteUser(idUser){
  const sql = "DELETE from tbl_usuario WHERE  id_usuario = ?";
  const conn = await database.connect();
  await conn.query(sql, idUser);
  conn.end();
}
export default {CreateUser, UpdateUser, DeleteUser};


