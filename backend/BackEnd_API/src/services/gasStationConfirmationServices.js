import { response } from "express";
import database from "../repository/connection.js";
import sql_commands from "../utils/dbQueries.js";
import natural from "../utils/naturalLanguageComparator.js";

async function insertGasStationLocation(place_ID, id_posto) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const sql = "CALL InserirPostoELocalizacao(?, ?, @msg);";
    const values = [place_ID, id_posto];
    try {
        let res = await sql_commands.call(conn, sql, values);
        return res != undefined ? res : { message: "dados cadastrados com sucesso", error_code: 200 };
    }
    catch (err) {
        console.log(err);
        //LOG_HERE
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally {
        try {
            await conn.release();
        }
        catch (err) {
            //LOG_HERE
            console.error("erro ao fechar o banco de dados");
        }
    }
}

async function insertGasStationLocationWithLatAndLon(place_ID, id_posto, latitude, longitude) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    // let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?";
    // let values = [place_ID];
    //arrumar a partir daqui
    sql = "INSERT INTO tbl_localizacao_posto (place_ID, fk_id_posto, latitude, longitude) VALUES (?, ?, ?, ?);";
    values = [place_ID, id_posto, latitude, longitude];
    try {
        let res = await conn.query(sql, values, (err, results, fields) => {
            console.log(results);
            console.log(fields);
            if (!!err) throw err;
        });
        return res != undefined ? res : { message: "dados cadastrados com sucesso", error_code: 200 };
    }
    catch (err) {
        // console.log(`não foi possível inserir um posto, dados do posto:
        // place_ID: ${place_ID}
        // id_posto: ${id_posto}
        // latitude: ${latitude}
        // longitude: ${longitude}
        // error:
        // ${err}`);
        //LOG_HERE
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    finally {
        conn.release();
    }
}

async function insertBySimilarity(mapsGS) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    const genericSearch = ["nome_posto", "endereco", "bairro", "municipio"];
    try {
        const id_posto = mapsGS.id_posto;
        let sql = "SELECT * FROM tbl_posto WHERE id_posto = ?";
        let values = [id_posto];
        let [rows] = await conn.execute(sql, values);
        const rowGS = rows[0];
        if (rows.length > 0) {
            const { nome_posto, endereco, bairro, municipio } = rows[0];
            const objToCompare = { nome_posto, endereco, bairro, municipio };
            const gs = natural.getSimilarity(objToCompare, mapsGS.data, genericSearch);
            for (let i = 0; i < gs.length; i++) {
                addPlaceID(gs[i]);
            }
            sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
            values = [gs[0].place_ID];
            [rows] = await conn.execute(sql, values);

            //encontrou um posto com a place_ID
            if (rows.length > 0) {
                sql = "SELECT * FROM tbl_posto WHERE id_posto = ?"
                values = [rows[0].fk_id_posto];
                [rows] = await conn.execute(sql, values);
                const actualGS = rows[0]
                sql = "SELECT * FROM tbl_Place_IDs WHERE place_ID = ?";
                values = [gs[0].place_ID];
                [rows] = await conn.execute(sql, values);
                if (rows.length > 0) {
                    const gsPlace = rows[0];
                    const data = natural.getSimilarity(rows[0], [rowGS, actualGS], genericSearch);
                    if (data[0].id_posto != actualGS) {
                        try {
                            await conn.execute("INSERT INTO tbl_postos_removidos(fk_id_posto) values(?)", [actualGS.id_posto]);
                        }
                        catch (err) {
                            try {
                                if (err.sqlState != 23000) console.log(err)
                            }
                            catch {
                            }
                        }
                        sql = "UPDATE tbl_localizacao_posto SET fk_id_posto = ? WHERE place_ID = ?;";
                        values = [data[0].id_posto, gsPlace.place_id];
                        await conn.execute(sql, values);
                    }
                    else {
                        try {
                            await conn.execute("INSERT INTO tbl_postos_removidos(fk_id_posto) values(?)", [rowGS.id_posto]);
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                }
                else{
                    console.log("place_ID não registrada na t:")
                    console.log(rows);
                }
                //     sql = "UPDATE tbl_localizacao_posto SET place_ID = ?, latitude = ?, longitude = ? WHERE id_posto = ?";
                //     values = [gs.place_ID, gs.latitude, gs.longitude, id_posto];
                //     const [results] = await conn.execute(sql, values);
                //     if(results.affectedRows < 1) throw new Error("não foi possível atualizar nenhum dado");
                // }
                // else{
                //     sql = "INSERT INTO tbl_localizacao_posto(place_ID, latitude, longitude, fk_id_posto) VALUES(?,?,?,?)";
                //     values = [gs.place_ID, gs.latitude, gs.longitude, id_posto];
                //     await conn.execute(sql, values);
            }
            else {
                    sql = "INSERT INTO tbl_localizacao_posto(place_ID, latitude, longitude, fk_id_posto) VALUES(?,?,?,?)";
                    values = [gs[0].place_ID, gs[0].latitude, gs[0].longitude, id_posto];
            }
        }
        else{
            console.log("um posto com esse id_posto não foi encontrado:")
            console.log(values);
        }
    }
    catch (err) {
        console.log(err);
    }
    finally {
        conn.release();
    }
}

async function addPlaceID(obj) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
    }
    try {
        const { place_ID, latitude, longitude, nome_posto, endereco, bairro, municipio, estado } = obj
        const sql = "insert into tbl_Place_IDs(place_ID, latitude, longitude, nome_posto, endereco, bairro, municipio, estado) values(?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [place_ID, latitude, longitude, nome_posto, endereco, bairro, municipio, estado];
        // if (values.includes(undefined)) throw new Error("o valor não pode ser undefined");
        await conn.execute(sql, values);
    }
    catch (err) {
        try {
            if (err.sqlState != '23000') console.log(err);
        }
        catch (err) {
        }
    }
    finally {
        conn.release()
    }
}

async function getRemovedGS() {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return null;
    }
    try {
        const [rows] = await conn.execute("SELECT * FROM tbl_postos_removidos;");
        if (rows.length > 0) return rows;
        console.log("nenhum dado");
        return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally{
        conn.release();
    }
}

async function removeGS(id_posto) {
    const conn = await database.getConnection();
    if (conn == null) {
        console.log("erro na conexão")
        return null;
    }
    try {
        console.log("removendo posto: " + id_posto)
        await conn.execute("INSERT INTO tbl_postos_removidos(fk_id_posto) VALUES(?);", [id_posto]);
        return null;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally{
        conn.release();
    }
}

export default { insertGasStationLocation, insertGasStationLocationWithLatAndLon, insertBySimilarity, addPlaceID, getRemovedGS, removeGS };