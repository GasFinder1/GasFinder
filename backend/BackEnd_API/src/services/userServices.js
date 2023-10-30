import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function CreateUser(name_user, email, password) {
  // const sql = "insert into tbl_usuario(nome_usuario,email,senha) values (?,?,?)"
  const sql = "call user_insert(?, ?, ?)"
  const values = [name_user, email, password];
  const conn = await database.getConnection();
  if (conn == null){
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try{
    const res = await sql_commands.call(conn ,sql, values);
    return res;
  }
  catch(err){
    //LOG_HERE
    console.log(err);
  }
  finally{
    await conn.end();
  }
}
async function UpdateUser(name_user, email, password, idUser) {
  const sql = "UPDATE tbl_usuario set nome_usuario = ?, email = ?, senha = ?  WHERE id_usuario = ?";
  const values = [name_user, email, password, idUser];
  const conn = await database.getConnection();
  if (conn == null){
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try{
    await conn.query(sql, values);
  }
  catch(err){
    //LOG_HERE
    console.log(err);
  }
  finally{
    await conn.end();
  }
}
async function DeleteUser(idUser) {
  const sql = "DELETE from tbl_usuario WHERE  id_usuario = ?";
  const conn = await database.getConnection();
  if (conn == null){
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try{
    await conn.query(sql, idUser);
  }
  catch(err){
    //LOG_HERE
    console.log(err);
  }
  finally{
    await conn.end();
  }
}
export default { CreateUser, UpdateUser, DeleteUser };


