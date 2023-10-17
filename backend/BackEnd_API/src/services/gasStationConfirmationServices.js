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
    const sql = "INSERT INTO tbl_localizacao_posto (lat, lon, fk_id_posto) VALUES(?, ?, ?)";
    const values = [lat, lon, id_posto];
    try {
        const [rows] = await conn.query("SELECT * FROM tbl_localizacao_posto WHERE lat = ? and lon = ?", [lat, lon]);
        if(rows.length < 1){
            await conn.query(sql, values);
            return true;
        }
        else {
            return false;
        }
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
    
    const sql = "CALL InserirPostoELocalizacao(?, ?);";
    const values = [lat, lon];
    try {
        const [rows] = await conn.query("SELECT * FROM tbl_localizacao_posto WHERE lat = ? and lon = ?", [lat, lon]);
        if(rows.length < 1){
            await conn.query(sql, values);
            return true;
        }
        else {
            throw new Error(`posto já cadastrado na lat: ${lat} e lon: ${lon}`);
        }
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