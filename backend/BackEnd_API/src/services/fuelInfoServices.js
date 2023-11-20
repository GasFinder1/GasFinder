const dataBase = require("../repository/connection.js");

async function checkFuel(conn, id_Posto, id_Combustivel) {
    const sql = "SELECT * FROM tbl_preco WHERE fk_id_posto = ? and fk_id_tipo_combustivel = ?;";
    const values = [id_Posto, id_Combustivel];
    if(conn != null && conn != undefined && conn != false){
        const [rows] = await conn.query(sql, values);
        return rows;
    }
    else{
        conn = await dataBase.connect();
        const [rows] = await conn.query(sql, values);
        conn.end();
        return rows;
    }
}

async function insertFuel(conn, id_Posto, id_Combustivel, valor) {
    const sql = "INSERT INTO tbl_preco(fk_id_posto, fk_id_tipo_combustivel, valor) VALUES(?,?,?)";
    const values = [id_Posto, id_Combustivel, valor];
    if(conn != null && conn != undefined && conn != false){
        await conn.query(sql, values);
    }
    else{
        conn = await dataBase.connect();
        await conn.query(sql, values);
        conn.end();
    }
}

async function updateFuel(conn, id_Posto, id_Combustivel, valor){
    const sql = "UPDATE tbl_preco set valor = ? WHERE fk_id_posto = ? and fk_id_tipo_combustivel = ?";
    const values = [valor, id_Posto, id_Combustivel];
    if(conn != null && conn != undefined && conn != false){
        await conn.query(sql, values);
    }
    else{
        conn = await dataBase.connect();
        await conn.query(sql, values);
        conn.end();
    }
}
module.exports = { checkFuel, insertFuel, updateFuel };