import database from "../repository/connection.js";
//checagem se o posto existe feita com procedure

async function connect() {
    try {
        const conn = await database.connect();
        return conn;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function insertGasStationLocation(lat, lon, id_posto) {
    const conn = await connect();
    if (conn == null) {
        return null;
    }
    const sql = "CALL InserirPostoELocalizacao(?, ?, ?)";
    const values = [lat, lon, id_posto];
    try {
        await conn.query(sql, values);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
    finally{
        await conn.end();
    }
}

async function createGasStation_InsertLocation(lat, lon) {
    const conn = await connect();
    if (conn == null) {
        return null;
    }
    
    const sql = "CALL InserirPostoELocalizacao(?, ?, 0);";
    const values = [lat, lon, 0];
    try {
        await conn.query(sql, values);
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
    finally{
        await conn.end();
    }
}

export default {createGasStation_InsertLocation, insertGasStationLocation};