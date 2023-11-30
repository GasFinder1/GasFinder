import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function CreateFavorite(idUser, idTlc) {
  const sql = "insert into tbl_favoritos(fk_id_usuario, fk_id_tlp) values (?,?)"
  const values = [idUser, idTlc];
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    await conn.query(sql, values)
      .then(([rows, fields]) => {
        console.log(fields);
      })
      .catch((err) => { throw new Error(err) })
    //   const res = await sql_commands.call(conn ,sql, values);
    //   return res;
    // }
    } catch (err) {
      //LOG_HERE
      console.log(err);
      throw new Error(err);
    }
    finally {
      await conn.end();
    }
  }
async function DeleteFavorite(idFavorite) {
    const sql = "DELETE from tbl_favotitos WHERE id_favorito = ?";
    const conn = await database.getConnection();
    if (conn == null) {
      return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    try {
      await conn.query(sql, idFavorite);
    }
    catch (err) {
      //LOG_HERE
      console.log(err);
    }
    finally {
      await conn.end();
    }
  }

  async function CheckUserExists(idUser) {
    console.log(idUser, "Service ID Usuário")
    const sql = "SELECT * FROM tbl_usuario WHERE id_usuario = ? ;";
    const conn = await database.getConnection();
    if (conn == null) {
      return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    try {
      const [rows] = await conn.query(sql, idUser);
      return rows;
    }
    catch (err) {
      //LOG_HERE
      console.log(err);
    }
    finally {
      await conn.end();
    }
  }

  async function CheckStationExists(placeID) {
    console.log(placeID);

    const sql = "SELECT id_tlp FROM tbl_localizacao_posto WHERE place_ID = ?;";
    const conn = await database.getConnection();

    if (conn == null) {
      return { error: "Houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }

    try {
      const [rows] = await conn.query(sql, placeID);
      console.log(rows);

      if (rows.length === 0) {
        return null;
      }
      return rows[0];
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await conn.end();
    }
  }

  export default { CreateFavorite, DeleteFavorite, CheckUserExists, CheckStationExists };