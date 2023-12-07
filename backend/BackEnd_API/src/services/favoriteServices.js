import database from "../repository/connection.js";
import infoFormatter from "../utils/infoFormatter.js";

async function CreateFavorite(idUser, idTlc) {
  const sql = "insert into tbl_favoritos(fk_id_usuario, fk_id_tlp) values (?,?)"
  const values = [idUser, idTlc];
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    await conn.execute(sql, values)
      .then(([rows, fields]) => {
        console.log(fields);
      })
      .catch((err) => { throw new Error(err) })
  } catch (err) {
    //LOG_HERE
    console.log(err);
    throw new Error(err);
  }
  finally {
    conn.release();
  }
}
async function DeleteFavorite(idUser, place_ID) {
  const sql = "DELETE from tbl_favoritos WHERE fk_id_usuario = ? AND fk_id_tlp = ?";
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    console.log(place_ID);
    const [rows] = await conn.query("SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?;", [place_ID]);
    if (rows.length < 1) throw new Error("o posto não existe");
    const id_tlp = rows[0].id_tlp;
    const [result] = await conn.execute(sql, [idUser, id_tlp]);
    if (result.affectedRows > 0) return { message: "atualizado com sucesso!" };
    throw new Error("nenhum dado foi excluido");
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
    return {error: "nenhum dado foi excluido"};
  }
  finally {
    conn.release();
  }
}

async function getFavorites(idUser) {
  const sql = "SELECT * from get_favorites WHERE fk_id_usuario = ?";
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const [rows] = await conn.execute(sql, [idUser]);
    if (rows.length > 0) return infoFormatter.favoriteInfoOrganizer(rows);
    throw new Error("não foi possível pegar nenhum dado");
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
    return false;
  }
  finally {
    conn.release();
  }
}

async function CheckUserExists(idUser) {
  // console.log(idUser, "Service ID Usuário")
  const sql = "SELECT * FROM tbl_usuario WHERE id_usuario = ? ;";
  const conn = await database.getConnection();
  if (conn == null) {
    return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
  }
  try {
    const [rows] = await conn.execute(sql, [idUser]);
    return rows;
  }
  catch (err) {
    //LOG_HERE
    console.log(err);
  }
  finally {
    conn.release();
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
    console.log(sql, placeID);
    const [rows] = await conn.execute(sql, [placeID]);
    console.log(rows);

    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    conn.release();
  }
}

export default { CreateFavorite, DeleteFavorite, CheckUserExists, CheckStationExists, getFavorites };