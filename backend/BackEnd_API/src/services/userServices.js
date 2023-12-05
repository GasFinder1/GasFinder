import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function CreateUser(name_user, email, password) {
  // const sql = "insert into tbl_usuario(nome_usuario,email,senha) values (?,?,?)"
  const sql = "call user_insert(?, ?, ?)"
  const values = [name_user, email, password];
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const res = await sql_commands.call(conn, sql, values);
    return res;
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
  }
  finally {
    await conn.release();
  }
}
async function UpdateUser(name_user, email, password, idUser) {
  const sql = "UPDATE tbl_usuario set nome_usuario = ?, email = ?, senha = ?  WHERE id_usuario = ?";
  const values = [name_user, email, password, idUser];
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    await conn.query(sql, values);
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
  }
  finally {
    await conn.release();
  }
}
async function DeleteUser(idUser) {
  const sql = "UPDATE tbl_usuario set nome_usuario = ?, email = NULL, senha = ? WHERE id_usuario = ?";
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    await conn.query(sql, ["Deletado", "", idUser]);
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
  }
  finally {
    await conn.release();
  }
}

async function checkEmail(email) {
  const sql = "SELECT * FROM tbl_usuario WHERE email = ?;";
  const dados = [email]
  console.log(sql)
  console.log(dados)

  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const [rows] = await conn.query(sql, dados);
    console.log(rows)
    if (rows.length == 0) {
      return { error: "nenhum registro foi encontrado", error_code: 400 }
    }
    return rows;
  }
  catch (err) {
    //LOG_HERE
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  finally {
    try {
      await conn.release();
    }
    catch (err) {
      //LOG_HERE
      console.log("Erro ao fechar a conexão: " + err);
    }
  }
}

async function checkPassword(email, pass) {
  const sql = "SELECT * FROM tbl_usuario WHERE email = ? and senha = ?";
  const dados = [email, pass]

  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const [rows] = await conn.query(sql, dados);
    if (rows.length = 0) {
      return { error: "nenhum registro foi encontrado", error_code: 400 }
    }
    return rows;
  }
  catch (err) {
    //LOG_HERE
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  finally {
    try {
      await conn.release();
    }
    catch (err) {
      //LOG_HERE
      console.log("Erro ao fechar a conexão: " + err);
    }
  }
}

async function changePassword(email, newPassword) {
  const sql = "UPDATE tbl_usuario SET senha = ? WHERE email = ?";
  const dataNewPass = [newPassword, email];

  const conn = await database.getConnection();
  try {
    await conn.query(sql, dataNewPass);
  }
  catch (err) {
    //LOG_HERE
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  finally {
    try {
      conn.release();
    }
    catch (err) {
      //LOG_HERE
      console.log("Erro ao fechar a conexão: " + err);
    }
  }
}

async function checkName(userName) {
  const sql = "SELECT * FROM tbl_usuario WHERE nome_usuario = ?";
  const dados = [userName]

  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const [rows] = await conn.query(sql, dados);
    if (rows.length = 0) {
      return { error: "nenhum registro foi encontrado", error_code: 400 }
    }
    return rows;
  }
  catch (err) {
    //LOG_HERE
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  finally {
    try {
      await conn.release();
    }
    catch (err) {
      //LOG_HERE
      console.log("Erro ao fechar a conexão: " + err);
    }
  }
}
export default { CreateUser, UpdateUser, DeleteUser, checkEmail, checkPassword, changePassword, checkName };


