import database from "../repository/connection.js";


async function login(email, password) {
  const sql = "select * from tbl_usuario where email = ? and senha = ?;";
  const dataLogin = [email, password];
<<<<<<< HEAD
  const conn = await database.getConnection();
  if(conn == null){
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try{
    const [rows] = await conn.query(sql, dataLogin);
    return rows;
  }
  catch(err){
    //LOG_HERE
    console.log(err);
  }
  finally{
    try{
      await conn.end();
    }
    catch(err){
      console.log("erro ao fechar o banco de dados");
      //LOG_HERE
    }
  }
=======
  const conn = await database.connect();
  const [rows] = await conn.query(sql, dataLogin);
  console.log(rows)
  conn.end();
>>>>>>> e519ae16ab2a1a460ffab48ee6d5019b73d8ae3c

  return rows;
}

export default { login };