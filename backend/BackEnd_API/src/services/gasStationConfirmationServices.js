import { response } from "express";
import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function insertGasStationLocation(lat, lon, id_posto) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const sql = "CALL InserirPostoELocalizacao(?, ?, ?, @msg);";
    const values = [lat, lon, id_posto];
    try {
        let res = await sql_commands.call(conn, sql, values);
        return res != undefined ? res : { message: "dados cadastrados com sucesso", error_code: 200};
    }
    catch (err) {
        console.log(err);
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally {
        try{
            await conn.end();
        }
        catch(err){
            //LOG_HERE
            console.error("erro ao fechar o banco de dados");
        }
    }
}

export default { insertGasStationLocation };