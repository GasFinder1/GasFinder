import database from "../repository/connection.js";


async function login(email, password) {
  const sql = "select * from tbl_usuario where email = ? and senha = ?;";
  const dataLogin = [email, password];
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
      await conn.release();
    }
    catch(err){
      console.log("erro ao fechar o banco de dados");
      //LOG_HERE
    }
  }

  return rows;
}

export default { login };