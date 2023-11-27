import database from '../repository/connection.js'

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

async function checkCode(email, codigo) {
  const sql = "SELECT * FROM tbl_usuario WHERE email = ? and senha = ?";
  const dados = [email, codigo]

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

export async function checkName(userName) {
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

export default { checkEmail, changePassword, checkCode }