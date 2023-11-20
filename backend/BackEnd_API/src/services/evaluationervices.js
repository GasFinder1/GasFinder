import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";

async function setEvaluation(idUsuario, placeID, eGasStation, eProduct, eService, opinion){
    const conn = await database.getConnection();
    if(conn == null){
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const sql = "CALL pr_avaliacao(?, ?, ?, ?, ?, ?, @msg);";
    const values = [idUsuario, placeID, eGasStation, eProduct, eService, opinion];
    try{
        let res = await sql_commands.call(conn, sql, values);
        return res ?? false ? res : { message: "dados cadastrados com sucesso", error_code: 200};
    }
    catch(err){
        //LOG_HERE
        console.log(err);
        //retorno de erro mais eficiente
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally{
        try{
            await conn.end();
        }
        catch(err){
            //LOG_HERE
            console.error(err)
        }
    }
}

async function getEvaluation(idUsuario, placeID){
    const conn = await database.getConnection();
    if(conn == null){
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    let sql = "CALL getEvaluation(?, ?)";
    let values = [placeID, idUsuario];

    try{
        const [rows] = await conn.query(sql, values);
        if(rows.length >= 1){
            return rows;
        }
        else{
            return { error: "o usuário ainda não avaliou o posto", error_code: 400 };
        }
    }
    catch(err){
        //LOG_HERE
        console.log(err);
        if(err.sqlMessage == 'o posto referido não foi encontrado'){
            return{error: err.sqlMessage, error_code: 400};
        }
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally{
        try{
            await conn.end();
        }
        catch(err){
            //LOG_HERE
            console.log(err);
        }
    }
}

export default { setEvaluation, getEvaluation };