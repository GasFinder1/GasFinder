const dataBase = require("../repository/connection.js");

async function checkCNPJ(conn, cnpj) {
    const sql = "SELECT * FROM tbl_posto WHERE cnpj = ?;";
    const values = [cnpj];
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

async function insertGasStation(conn, nome_posto, cnpj, endereco, fantasia, cep, municipio, bandeira, numero, bairro, complemento, uf) {
    const sql = "INSERT INTO tbl_posto(nome_posto, cnpj, endereco, fantasia, cep, municipio, bandeira, numero, bairro, complemento, uf) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
    const values = [nome_posto, cnpj, endereco, fantasia, cep, municipio, bandeira, numero, bairro, complemento, uf];
    if(conn != null && conn != undefined && conn != false){
        await conn.query(sql, values);
    }
    else{
        conn = await dataBase.connect();
        await conn.query(sql, values);
        conn.end();
    }
}

async function updateGasStation(conn, nome_posto, cnpj, endereco, fantasia, cep, municipio, bandeira, numero, bairro, complemento, uf){
    const sql = "UPDATE tbl_posto set nome_posto = ?, endereco = ?, fantasia = ?, cep = ?, municipio = ?, bandeira = ?, numero = ?, bairro = ?, complemento = ?, uf = ? WHERE cnpj = ?";
    const values = [nome_posto, endereco, fantasia, cep, municipio, bandeira, numero, bairro, complemento, uf, cnpj];
    console.log("Updating CNPJ: " + cnpj);
    if(conn != null && conn != undefined && conn != false){
        await conn.query(sql, values);
    }
    else{
        conn = await dataBase.connect();
        await conn.query(sql, values);
        conn.end();
    }
}

async function getAmountOfGasStation(conn){
    const sql = "SELECT COUNT(*) FROM tbl_posto;";
    if(conn != null && conn != undefined && conn != false){
        const [rows] = await conn.query(sql);
        return rows;
    }
    else{
        conn = await dataBase.connect();
        const [rows] = await conn.query(sql);
        conn.end();
        return rows;
    }
}

module.exports = { checkCNPJ, insertGasStation, updateGasStation, getAmountOfGasStation };